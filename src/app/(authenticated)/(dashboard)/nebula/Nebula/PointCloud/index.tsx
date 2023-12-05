'use client';

import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';
import StemDetails, { EXPANDED_TOOLTIP_HEIGHT } from './StemDetails';
import { useStems } from '../../providers/stems';
import ZoomControls from './ZoomControls';
import { useAudioPlayer } from '../../providers/audioPlayer';
import { scaleBetween } from '@/utils/helpers/math';
import { useTour } from '@/app/providers/tour';
import { isMobile } from '@/utils/helpers/env';
import HelpTooltip from './HelpTooltip';

const CIRCLE_RADIUS = 85;
const HOVER_CIRCLE_RADIUS = 280;
const OVERLAY_RADIUS = 10;

export const CATEGORY_COLORS = {
  bass: '#d8547a',
  melody: '#ed8543',
  drums: '#4757b5',
  chords: '#fceb4f',
};

interface PointCloud {
  onNodeEnter: (d: InputStem) => void;
  onNodeLeave: (d: InputStem) => void;
  onNodeClick: (d?: InputStem) => void;
}

type D3Selection = d3.Selection<
  d3.BaseType | SVGCircleElement | HTMLDivElement,
  InputStem,
  d3.BaseType,
  unknown
>;

const PointCloud: React.FC<PointCloud> = ({
  onNodeEnter,
  onNodeLeave,
  onNodeClick,
}) => {
  const { addStep, currentStepIndex, steps } = useTour();
  const { playing } = useAudioPlayer();
  const [anchorTooltip, setAnchorTooltip] = useState(false);
  const [tooltipCorner, setTooltipCorner] = useState<string>('left');
  const [tooltipExpandDown, setTooltipExpandDown] = useState(false);

  const { stems, searchedStems, selectedStem } = useStems();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesRef =
    useRef<d3.Selection<d3.BaseType, unknown, null, undefined>>();
  const circlesRef = useRef<D3Selection>();
  const overlaysRef = useRef<D3Selection>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hoverTooltipRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<Element, unknown>>();

  const [lastResized, setLastResized] = useState<number>(Date.now());
  const [initialHeight, setInitialHeight] = useState<number>(0);

  useEffect(() => {
    setAnchorTooltip(isMobile());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setLastResized(Date.now());
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getDimensions = useCallback(() => {
    let containerWidth = 0,
      containerHeight = 0,
      width = 0,
      height = 0;

    const margin = { top: 20, bottom: 20, right: 20, left: 20 };

    if (!svgRef.current)
      return { containerWidth, containerHeight, margin, width, height };

    containerWidth = svgRef.current.parentElement?.clientWidth || 0;
    containerHeight = svgRef.current.parentElement?.clientHeight || 0;

    width = containerWidth - margin.left - margin.right;
    height = containerHeight - margin.top - margin.bottom;

    return {
      containerWidth,
      containerHeight,
      margin,
      width,
      height,
    };
  }, []);

  const getTooltipPosition = useCallback(
    ({
      ref,
      x,
      y,
    }: {
      ref: RefObject<HTMLDivElement>;
      x: number;
      y: number;
    }) => {
      const offset = 10;

      const tooltip = d3.select(ref.current).selectAll('.tooltip');

      const tooltipWidth = (tooltip.node() as Element).getBoundingClientRect()
        .width;

      const tooltipHeight = (tooltip.node() as Element).getBoundingClientRect()
        .height;

      if (anchorTooltip) {
        const { width, height } = getDimensions();
        setTooltipCorner('all');
        setTooltipExpandDown(false);
        return {
          left: width / 2 - tooltipWidth / 2 + 'px',
          top: height - tooltipHeight / 2 + 'px',
        };
      }

      let left = x - tooltipWidth - offset;
      let top = y - tooltipHeight - offset;

      let leftOverflow = false,
        topOverflow = false;

      if (left < 0) {
        leftOverflow = true;
        left = x + offset;
      }

      if (top - tooltipHeight < 0) {
        topOverflow = true;
        top = y + offset;
      }

      setTooltipCorner(
        leftOverflow ? (topOverflow ? 'tl' : 'bl') : topOverflow ? 'tr' : 'br'
      );

      setTooltipExpandDown(top - EXPANDED_TOOLTIP_HEIGHT < 0);

      return { left: left + 'px', top: top + 'px' };
    },
    [anchorTooltip, getDimensions]
  );

  const getAxesScale = useCallback(() => {
    const { margin, width } = getDimensions();

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(stems, (d) => d.coordinates.x)!])
      .range([margin.left, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(stems, (d) => d.coordinates.y)!])
      .range([initialHeight, margin.bottom]);

    return { xScale, yScale };
  }, [getDimensions, stems, initialHeight]);

  const scaleSvg = useCallback(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const { containerWidth, containerHeight } = getDimensions();

    svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('viewBox', '0 0 ' + containerWidth + ' ' + containerHeight);
  }, [getDimensions]);

  const scalePoints = useCallback(() => {
    const scaleDuration = 500;

    if (!circlesRef.current || !overlaysRef.current) return;

    const { xScale, yScale } = getAxesScale();

    circlesRef.current
      .transition()
      .duration(scaleDuration)
      .ease(d3.easeCubic)
      .attr('cx', (d) => xScale(d.coordinates.x))
      .attr('cy', (d) => yScale(d.coordinates.y))
      .attr('r', CIRCLE_RADIUS)
      .attr('opacity', 1);

    overlaysRef.current
      .transition()
      .duration(scaleDuration)
      .ease(d3.easeCubic)
      .attr('cx', (d) => xScale(d.coordinates.x))
      .attr('cy', (d) => yScale(d.coordinates.y));

    const tooltip = d3.select(tooltipRef.current).selectAll('.tooltip');

    const selectedCircle = circlesRef.current?.filter(
      (c) => c.itemId === selectedStem?.itemId
    );

    if (!selectedCircle.empty()) {
      let x = xScale(selectedCircle.datum().coordinates.x);
      let y = yScale(selectedCircle.datum().coordinates.y);

      const { left, top } = getTooltipPosition({ x, y, ref: tooltipRef });

      tooltip
        .transition()
        .duration(scaleDuration)
        .ease(d3.easeCubic)
        .style('left', left)
        .style('top', top)
        .style('opacity', 1);

      d3.select(svgRef.current)
        .selectAll('.active-star')
        .transition()
        .duration(scaleDuration)
        .ease(d3.easeCubic)
        .attr('transform', `translate(${x}, ${y})`);
    }
  }, [getAxesScale, getTooltipPosition, selectedStem?.itemId]);

  const scale = useCallback(() => {
    scaleSvg();
    scalePoints();
  }, [scalePoints, scaleSvg]);

  const handleHoverIn = useCallback(
    (d?: InputStem) => {
      const scaleDuration = 500;
      const { xScale, yScale } = getAxesScale();
      if (!d) return;

      const circle = circlesRef.current?.filter((c) => c.itemId === d.itemId);
      if (!circle) return;

      const hoverTooltip = d3
        .select(hoverTooltipRef.current)
        .selectAll('.tooltip');
      let x = xScale(circle.datum().coordinates.x);
      let y = yScale(circle.datum().coordinates.y);
      const { left, top } = getTooltipPosition({ x, y, ref: hoverTooltipRef });

      circle
        .transition()
        .duration(180)
        .ease(d3.easeCubic)
        .attr('r', HOVER_CIRCLE_RADIUS);

      hoverTooltip
        .transition()
        .duration(scaleDuration)
        .ease(d3.easeCubic)
        .style('left', left)
        .style('top', top)
        .style('opacity', 1);

      onNodeEnter(d);
    },
    [onNodeEnter, getAxesScale, getTooltipPosition]
  );

  const handleHoverOut = useCallback(
    (d?: InputStem) => {
      if (!d) return;

      const circle = circlesRef.current?.filter((c) => c.itemId === d.itemId);
      if (!circle) return;

      const selected = JSON.parse(circle.attr('selected'));

      if (!selected)
        circle.transition().duration(10000).attr('r', CIRCLE_RADIUS);

      const hoverTooltip = d3
        .select(hoverTooltipRef.current)
        .selectAll('.tooltip');

      hoverTooltip
        .transition()
        .duration(500)
        .ease(d3.easeCubic)
        .style('opacity', 0);

      onNodeLeave(d);
    },
    [onNodeLeave]
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg
      .on('click', () => onNodeClick())
      .on('touchmove', (event) => {
        if (!svgRef.current || !overlaysRef.current) return;

        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;

        const point = svgRef.current.createSVGPoint();
        point.x = touchX;
        point.y = touchY;

        overlaysRef.current.each(function () {
          const overlay = d3.select(this);

          const isOverOverlay = (this as SVGCircleElement).isPointInFill(point);

          if (isOverOverlay) {
            const datum = overlay.datum() as InputStem;
            if (overlay.attr('state') !== 'hover') {
              onNodeEnter(datum);
              overlay.attr('state', 'hover');
            }
          } else {
            onNodeLeave(overlay.datum() as InputStem);
            overlay.attr('state', '');
          }
        });
      })
      .on('touchend', (event) => {
        if (!svgRef.current || !overlaysRef.current) return;

        const touchX = event.changedTouches[0].clientX;
        const touchY = event.changedTouches[0].clientY;

        const point = svgRef.current.createSVGPoint();
        point.x = touchX;
        point.y = touchY;

        overlaysRef.current.each(function () {
          const overlay = d3.select(this);

          const isOverOverlay = (this as SVGCircleElement).isPointInFill(point);
          if (isOverOverlay) onNodeClick(overlay.datum() as InputStem);
        });
      });
  }, [onNodeClick, onNodeEnter, onNodeLeave]);

  const setup = useCallback(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    nodesRef.current = svg.select('g.nodes');
    circlesRef.current = nodesRef.current.selectAll('.circles');
    overlaysRef.current = nodesRef.current.selectAll('.overlays');

    Object.keys(CATEGORY_COLORS).forEach((category) => {
      const color = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS];
      const circleGradient = svg
        .append('defs')
        .append('radialGradient')
        .attr('id', 'circle-gradient-' + category);

      const circleGradientSteps = [
        { offset: '0%', color: 'white' },
        { offset: '3%', color: color, opacity: '.35' },
        { offset: '5%', color: color, opacity: '.2' },
        { offset: '10%', color: color, opacity: '0.08' },
        { offset: '15%', color: color, opacity: '0.05' },
        { offset: '25%', color: color, opacity: '0.02' },
        { offset: '50%', color: color, opacity: '0.015' },
        { offset: '100%', color: color, opacity: '0.0' },
      ];

      circleGradientSteps.forEach((stepData) => {
        const step = circleGradient
          .append('stop')
          .attr('offset', stepData.offset)
          .attr('stop-color', stepData.color);

        if (stepData.opacity) {
          step.attr('stop-opacity', stepData.opacity);
        }
      });

      const lineGradient = svg
        .append('defs')
        .append('radialGradient')
        .attr('id', 'line-gradient-' + category);

      const lineGradientSteps = [
        { offset: '0%', color: 'white' },
        { offset: '7%', color: color, opacity: '.85' },

        {
          offset: '40%',
          color: color,
          opacity: color === CATEGORY_COLORS.drums ? '.8' : '.4',
        },

        {
          offset: '76%',
          color: color,
          opacity: color === CATEGORY_COLORS.drums ? '.6' : '.1',
        },

        { offset: '100%', color: color, opacity: '0.0' },
      ];

      lineGradientSteps.forEach((stepData) => {
        const step = lineGradient
          .append('stop')
          .attr('offset', stepData.offset)
          .attr('stop-color', stepData.color);

        if (stepData.opacity) {
          step.attr('stop-opacity', stepData.opacity);
        }
      });
    });

    d3.select(tooltipRef.current)
      .selectAll('.tooltip')
      .style('position', 'absolute')
      .style('left', '50%')
      .style('top', '50%')
      .style('opacity', 0);

    d3.select(hoverTooltipRef.current)
      .selectAll('.tooltip')
      .style('position', 'absolute')
      .style('left', '50%')
      .style('top', '50%')
      .style('opacity', 0);

    scaleSvg();
  }, [scaleSvg]);

  const setupZoom = useCallback(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const { containerWidth, containerHeight } = getDimensions();

    const extentHeight = containerHeight > 300 ? containerHeight : 0;

    zoomRef.current = d3
      .zoom()
      .scaleExtent([1, 5])
      .extent([
        [0, 0],
        [containerWidth, extentHeight],
      ])
      .translateExtent([
        [0, 0],
        [containerWidth, containerHeight],
      ])
      .on('zoom', handleZoom);

    function handleZoom(e: any) {
      if (!isMobile()) {
        setAnchorTooltip(e.transform?.k > 1);
      }
      d3.select('svg g.nodes').attr('transform', e.transform);
    }

    svg.call(zoomRef.current as any);
  }, [getDimensions]);

  const handleNodeClick = useCallback(
    (d: InputStem) => {
      const circle = circlesRef.current?.filter((c) => c.itemId === d.itemId);
      if (!circle) return;

      const wasSelected = JSON.parse(circle.attr('selected'));

      onNodeClick(d);

      circle.attr('selected', !wasSelected);

      const tooltip = d3.select(tooltipRef.current).selectAll('.tooltip');

      const { left, top } = getTooltipPosition({
        ref: tooltipRef,
        x: Number(circle.attr('cx')),
        y: Number(circle.attr('cy')),
      });

      tooltip
        .transition()
        .duration(350)
        .ease(d3.easeCubic)
        .style('opacity', wasSelected ? 0 : 1);

      tooltip
        .transition()
        .duration(350)
        .ease(d3.easeCubic)
        .style('left', left)
        .style('top', top)
        .style('opacity', wasSelected ? 0 : 1);
    },
    [getTooltipPosition, onNodeClick]
  );

  const populate = useCallback(() => {
    const scaleDuration = 350;
    if (!circlesRef.current || !overlaysRef.current) return;

    const { xScale, yScale } = getAxesScale();

    const hoverTourStem = searchedStems[203];
    const activeTourStem = searchedStems[Math.floor(searchedStems.length / 2)];

    circlesRef.current = circlesRef.current
      .data(searchedStems, (d) => d.itemId)
      .join(
        (enter) => {
          const entered = enter
            .append('circle')
            .attr('id', (d) => d.itemId)
            .attr('class', (d) => {
              return d.itemId === activeTourStem.itemId
                ? 'tour-node-active'
                : d.itemId === hoverTourStem?.itemId
                ? 'tour-node-hover'
                : '';
            })
            .attr('r', CIRCLE_RADIUS)
            .attr('opacity', 0)
            .attr('cx', (d) => xScale(d.coordinates.x))
            .attr('cy', (d) => yScale(d.coordinates.y))
            .attr('fill', (d) => {
              return `url(#circle-gradient-${d.category})`;
            });

          return entered;
        },
        (update) => update,
        (exit) =>
          exit
            .transition()
            .duration(scaleDuration)
            .ease(d3.easeCubic)
            .attr('r', 0)
            .remove()
      );

    if (!isMobile()) {
      addStep({
        step: {
          disableBeacon: true,
          target: '.tour-node-hover',
          title: 'Hovering',
          stem: hoverTourStem,
          content: (
            <>
              <span className='text-gray-999'>
                The Sound Nebula displays all stems KORUS has to offer as stars.
              </span>
              <span className='text-purple-9a'> Simply move over a star</span>
              <span className='text-gray-999'>
                {' '}
                to hear a preview of that stem.
              </span>
            </>
          ),
        },
        index: 1,
      });
    }

    addStep({
      step: {
        disableBeacon: true,
        target: '.tour-node-active',
        title: 'Selecting',
        stem: activeTourStem,
        content: (
          <>
            <span className='text-purple-9a'>
              By selecting a star you can hear it&apos;s entire duration or
              create with it,
            </span>
            <span className='text-gray-999'>
              {' '}
              if you meet all the requirements.
            </span>
          </>
        ),
      },
      index: isMobile() ? 1 : 2,
    });

    circlesRef.current
      .transition()
      .duration(350)
      .ease(d3.easeCubic)
      .attr('opacity', 1)
      .attr('cx', (d) => xScale(d.coordinates.x))
      .attr('cy', (d) => yScale(d.coordinates.y))
      .attr('fill', (d) => {
        return `url(#circle-gradient-${d.category})`;
      });

    overlaysRef.current = overlaysRef.current
      .data(searchedStems, (d) => d.itemId)
      .join(
        (enter) =>
          enter
            .append('circle')
            .attr('id', (d) => d.itemId)
            .attr('r', OVERLAY_RADIUS)
            .attr('fill', 'transparent')
            .style('pointer-events', 'all')
            .attr('class', 'nebula-point'),
        (update) => update,
        (exit) => exit.remove()
      )
      .on('mouseover', (_, d) => handleHoverIn(d))
      .on('mouseout', (_, d) => handleHoverOut(d))

      .on('click', (e, d) => {
        e.preventDefault();
        e.stopPropagation();
        handleNodeClick(d);
      });
  }, [
    addStep,
    getAxesScale,
    handleHoverIn,
    handleHoverOut,
    handleNodeClick,
    searchedStems,
  ]);

  useEffect(() => {
    circlesRef.current?.attr('selected', (d) => selectedStem === d);
  }, [selectedStem]);

  useEffect(() => {
    setup();

    const svg = d3.select(svgRef.current);

    return () => void svg.remove();
  }, [setup]);

  useEffect(() => {
    setupZoom();
  }, [setupZoom]);

  useEffect(() => {
    window.addEventListener('resize', scale);

    return () => window.removeEventListener('resize', scale);
  }, [scale]);

  useEffect(() => {
    const { height } = getDimensions();

    if (initialHeight === 0) {
      setInitialHeight(height);
    }

    populate();
    scalePoints();
  }, [getDimensions, initialHeight, populate, scalePoints]);

  useEffect(() => {
    setupZoom();
  }, [lastResized, setupZoom]);

  useEffect(() => {
    if (!nodesRef.current) return;

    nodesRef.current.selectAll('g.active-star').remove();

    if (!selectedStem) return;

    const circle = circlesRef.current?.filter(
      (c) => c.itemId === selectedStem?.itemId
    );

    if (!circle) return;

    const numLines = 10; // Number of intersecting lines
    const minimumLineLength = 20;
    const maximunLineLength = 70;

    // Function to calculate the points for the intersecting lines
    function calculateLinePoints() {
      const angleIncrement = (2 * Math.PI) / numLines;
      const points = [];

      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement + 1;
        let l = scaleBetween(
          Math.random(),
          [0, 1],
          [minimumLineLength, maximunLineLength]
        );
        const x1 = +l * Math.cos(angle);
        const y1 = +l * Math.sin(angle);
        const x2 = -l * Math.cos(angle);
        const y2 = -l * Math.sin(angle);
        points.push({ x1, y1, x2, y2 });
      }

      return points;
    }

    const circleX = parseFloat(circle?.attr('cx'));
    const circleY = parseFloat(circle?.attr('cy'));

    nodesRef.current
      .append('g')
      .attr('class', 'active-star')
      .attr('transform', `translate(${circleX}, ${circleY})`)
      .append('g')
      .attr('class', 'animate-spin-slow')
      .selectAll('line')
      .data(calculateLinePoints())
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .attr('x1', (d) => d.x1)
      .attr('y1', (d) => d.y1)
      .attr('x2', (d) => d.x2)
      .attr('y2', (d) => d.y2)
      .style('animation', (_, i) => {
        return `fade ${1 + 5 * Math.random()}s ease-in-out infinite`;
      })
      .attr('stroke', `url(#line-gradient-${circle.datum().category})`);
  }, [selectedStem]);

  useEffect(() => {
    nodesRef.current
      ?.selectAll('g.active-star')
      .select('g')
      .style('animation', playing ? `fade 1s ease-in-out infinite` : 'none');
  }, [playing]);

  const handleZoom = useCallback((scaleVal: number) => {
    if (!zoomRef.current) return;

    d3.select(svgRef.current)
      .transition()
      .call(zoomRef.current.scaleBy as any, scaleVal);
  }, []);

  useEffect(() => {
    if (!steps[currentStepIndex] || !steps[currentStepIndex].stem) return;

    if (currentStepIndex === 1) {
      handleHoverIn(steps[currentStepIndex].stem);
    } else {
      handleHoverOut(steps[currentStepIndex].stem);
    }
  }, [currentStepIndex, handleHoverIn, handleHoverOut, steps]);

  return (
    // This overflow-y-hidden is to hide nebula overflow on container height resize
    <div className='w-full h-full overflow-y-hidden' ref={containerRef}>
      <svg ref={svgRef} preserveAspectRatio='xMidYMid meet'>
        <g className='filters'></g>
        <g className='nodes'></g>
      </svg>
      <div ref={hoverTooltipRef}>
        <div style={{ opacity: 0 }} className='tooltip z-[20]'>
          <HelpTooltip />
        </div>
      </div>
      <div ref={tooltipRef}>
        <div className='tooltip z-[20]'>
          <StemDetails
            stem={selectedStem}
            corner={tooltipCorner}
            expandDown={tooltipExpandDown}
          />
        </div>
      </div>
      <ZoomControls onZoom={handleZoom} />
    </div>
  );
};

export default PointCloud;
