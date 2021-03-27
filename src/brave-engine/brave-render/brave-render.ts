import { Camera } from '../class/camera';
import { GameObject } from '../class/game-object';
import { Light } from '../class/light';
import { createShaderProgram } from './lib/create-shader-program';
import { rgbaColorArrayToFloatColorArray } from './utils/rgba-color-array-to-float-color-array';

export class BraveRender {
  private camera!: Camera;
  private glContext: WebGL2RenderingContext;

  private sceneObjects = new Array<GameObject>();
  private sceneLights = new Array<GameObject>();

  private renderWidth = 0;
  private renderHeight = 0;

  private lastUpdatedTime = 0;

  constructor(glContext: WebGL2RenderingContext) {
    this.glContext = glContext;
  }

  setRenderSize(width: number, height: number) {
    this.renderWidth = width;
    this.renderHeight = height;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  addLight(light: Light) {
    this.sceneLights.push(light);
  }

  draw(gameObject: GameObject) {
    this.sceneObjects.push(gameObject);
  }

  render(elapsedTime: number, factoryTime = 1) {
    // Calculate delta time and update lastUpdatedTime
    const timeInSeconds = elapsedTime * 0.001;
    const deltaTime = (timeInSeconds - this.lastUpdatedTime) * factoryTime;
    this.lastUpdatedTime = timeInSeconds;

    // If not exists camera cancel render
    if (!this.camera) {
      return;
    }

    // Set clear color using camera clear color
    const clearColorFloat = rgbaColorArrayToFloatColorArray(
      this.camera.clearColor
    );
    this.glContext.clearColor(
      clearColorFloat[0],
      clearColorFloat[1],
      clearColorFloat[2],
      clearColorFloat[3]
    );

    this.glContext.clearDepth(1.0); // Clear everything
    this.glContext.enable(this.glContext.DEPTH_TEST); // Enable depth testing
    this.glContext.depthFunc(this.glContext.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    this.glContext.clear(
      this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT
    );

    // Order scene objects by z axis
    const sceneObjects = this.orderRenderByZAxis(this.sceneObjects);

    // Clear the scene objects and scene lights after render
    this.sceneLights = new Array();
    this.sceneObjects = new Array();
  }

  createShaderProgram(vsSource: string, fsSource: string) {
    return createShaderProgram(this.glContext, vsSource, fsSource);
  }

  private orderRenderByZAxis(data: any[]) {
    return data;
  }
}
