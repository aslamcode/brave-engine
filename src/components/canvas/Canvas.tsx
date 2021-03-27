import React, { Component, createRef } from 'react';
import './canvas.css';

interface AppProps {
  width?: number;
  height?: number;
}
interface AppState {}

export class Canvas extends Component<AppProps, AppState> {
  private canvasRef = createRef<HTMLCanvasElement>();

  constructor(props: any) {
    super(props);
  }

  getContext(context: string) {
    return this.canvasRef.current!.getContext(context);
  }

  get webglContext() {
    return this.canvasRef.current!.getContext('webgl') as WebGLRenderingContext;
  }

  get webgl2Context() {
    return this.canvasRef.current!.getContext(
      'webgl2'
    ) as WebGL2RenderingContext;
  }

  get canvasElement() {
    return this.canvasRef.current;
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className='canvas'
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
