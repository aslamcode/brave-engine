import React, { Component, createRef } from 'react';
import './assets/scss/style.css';
import './assets/scss/reset.css';

import { Canvas } from './components/canvas/Canvas';
import { BraveRender } from './brave-engine/brave-render/brave-render';
import { GameObject } from './brave-engine/class/game-object';
import { Camera } from './brave-engine/class/camera';

interface AppProps { }
interface AppState { }

export default class App extends Component<AppProps, AppState> {
  private canvasRef = createRef<Canvas>();
  private braveRender!: BraveRender;
  private sceneObjects!: GameObject[];

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.onStart();
  }

  onStart() {
    // Get the Webgl context
    const glContext = this.canvasRef.current!.webgl2Context;

    // Create a new Brave Render
    this.braveRender = new BraveRender(glContext);

    // Create and set camera
    const camera = new Camera();
    camera.setClearColor(0, 0, 0, 0.8);
    this.braveRender.setCamera(camera);

    // Create sceneObjects
    this.sceneObjects = new Array();

    // Create a box and put on scene
    const box = new GameObject();
    this.sceneObjects.push(box);

    requestAnimationFrame(this.onUpdate.bind(this));
  }

  onUpdate(time: number) {
    // Set all objects to draw
    for (const elem of this.sceneObjects) {
      this.braveRender.draw(elem);
    }

    // Set render size
    // Render size is used to calculate aspect ratio
    this.braveRender.setRenderSize(
      this.canvasRef!.current!.canvasElement!.clientWidth,
      this.canvasRef!.current!.canvasElement!.clientHeight
    );

    // Render the scene
    this.braveRender.render(time);

    // Call update to render the next frame
    requestAnimationFrame(this.onUpdate.bind(this));
  }

  render() {
    return <Canvas ref={this.canvasRef} width={1920} height={1080} />;
  }
}
