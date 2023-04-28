import React, { Component, createRef } from 'react';
import './assets/css/reset.css';
import './assets/css/style.css';

import { Canvas } from './components/canvas/Canvas';
import { BraveRender } from './brave-engine/brave-render/brave-render';
import { Camera } from './brave-engine/game-object/camera';
import { Scene } from './brave-engine/class/scene';
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
    camera.transform.position.x = 0;
    camera.transform.position.y = 0;
    camera.transform.position.z = 0;
    this.braveRender.setCamera(camera);

    // Create sceneObjects
    this.scene = new Scene(glContext);

    // Create a cube and add on scene
    const cube = new Cube();
    cube.transform.position.z = -10;
    cube.transform.position.x = -4;
    this.scene.add(cube);

    const cube2 = new Cube();
    cube2.transform.position.z = -10;
    this.scene.add(cube2);

    const cube3 = new Cube();
    cube3.transform.position.z = -10;
    cube3.transform.position.x = 4;
    this.scene.add(cube3);
    
    // Animate cube rotations. The right way is using onUpdate lifecyle hook in game object, this is just a test.
    setInterval(() => {
      cube.transform.rotation.x += 0.1;
      cube2.transform.rotation.y += 0.1;
      cube3.transform.rotation.z += 0.1;
    });

    requestAnimationFrame(this.onUpdate.bind(this));
  }

  onUpdate(time: number) {
    // Set all objects to draw
    // Call game objects update method
    for (const elem of this.scene) {
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
    return <Canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} />;
  }
}
