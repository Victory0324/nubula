import React from 'react';
import { SketchProps, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

interface MySketchProps extends SketchProps {
  width?: number;
  height?: number;
}

const sketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(0, 0, p5.WEBGL);

  p5.updateWithProps = (props: MySketchProps) => {
    p5.resizeCanvas(props.width, props.height);
  };

  p5.draw = () => {
    p5.background('red');
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export default function HelloP5({ width, height }: MySketchProps) {
  return <NextReactP5Wrapper {...{ width, height, sketch }} />;
}
