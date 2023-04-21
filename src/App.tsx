import React, { Component, createRef } from 'react';
import './assets/css/reset.css';
import './assets/css/style.css';

import { Canvas } from './components/canvas/Canvas';
import { BraveRender } from './brave-engine/brave-render/brave-render';
import { GameObject } from './brave-engine/game-object/game-object';
import { Camera } from './brave-engine/game-object/camera';
import { Scene } from './brave-engine/class/scene';
import { MeshRendererComponent } from './brave-engine/component/mesh-renderer-component';
import { Cube } from './brave-engine/game-object/geometries/cube';

interface AppProps { }
interface AppState { }

export default class App extends Component<AppProps, AppState> {
  private canvasRef = createRef<Canvas>();
  private braveRender!: BraveRender;
  private scene!: Scene;

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
    camera.clearColor.setValue(0, 0, 0, 1);
    this.braveRender.setCamera(camera);

    // Create sceneObjects
    this.scene = new Scene();

    // Create a box and put on scene
    const box = new Cube();
    this.scene.push(box);

    requestAnimationFrame(this.onUpdate.bind(this));
  }

  onUpdate(time: number) {
    // Set all objects to draw
    // Call game objects update method
    for (const elem of this.scene) {
      // Just use active objects
      if (elem.active) {
        this.braveRender.draw(elem);
      }
    }

    // Set render size
    // Render size is used to calculate aspect ratio
    this.braveRender.setRenderSize(
      this.canvasRef?.current?.canvasElement?.clientWidth || 0,
      this.canvasRef?.current?.canvasElement?.clientHeight || 0
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
