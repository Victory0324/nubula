import React, { useRef } from 'react';
import { SketchProps, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

interface MySketchProps extends SketchProps {
  width?: number;
  height?: number;
}

const sketch: Sketch = (p5) => {
  let theShader: any;
  let WebGL: any;
  let Canvas: any;
  let width = 0,
    height = 0;

  p5.preload = () => {
    theShader = p5.loadShader(
      'shaders/voronoi/shader.vert',
      'shaders/voronoi/shader.frag'
    );
  };

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
    p5.pixelDensity(1);
    p5.noStroke();

    WebGL = p5.createGraphics(width, height, p5.WEBGL);
    Canvas = p5.createGraphics(width, height);

    WebGL.noStroke();
    Canvas.noStroke();
    WebGL.background(0);
    Canvas.background(0);
  };

  p5.updateWithProps = (props: MySketchProps) => {
    width = props.width || 0;
    height = props.height || 0;

    p5.resizeCanvas(width, height);
  };

  p5.draw = () => {
    WebGL.shader(theShader);

    theShader.setUniform('iResolution', [width, height]);
    theShader.setUniform('iPixelDensity', p5.pixelDensity());
    theShader.setUniform('iCanvas', Canvas);
    theShader.setUniform('iMouse', [p5.mouseX, p5.mouseY]);
    theShader.setUniform('iTime', p5.frameCount);

    WebGL.rect(0, 0, width, height);

    p5.image(WebGL, -width / 2, -height / 2);
  };
};

export default function Voronoi({ width, height }: MySketchProps) {
  return <NextReactP5Wrapper {...{ width, height, sketch }} />;
}
