import { Camera } from '../game-object/camera';
import { GameObject } from '../game-object/game-object';
import { Light } from '../game-object/light';
import { createShaderProgram } from './lib/create-shader-program';
import { rgbaColorArrayToFloatColorArray } from '../util/rgba-color-array-to-float-color-array';
import { mat4 } from 'gl-matrix';

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

    // Set viewport render size and canvas render size
    this.glContext.viewport(0, 0, this.renderWidth, this.renderHeight);
    this.glContext.canvas.width = this.renderWidth;
    this.glContext.canvas.height = this.renderHeight;

    // If not exists camera, render black screen and cancel render
    if (!this.camera) {
      this.glContext.clearColor(0, 0, 0, 1);
      this.glContext.clearDepth(1.0); // Clear everything
      this.glContext.enable(this.glContext.DEPTH_TEST); // Enable depth testing
      this.glContext.depthFunc(this.glContext.LEQUAL); // Near things obscure far things

      this.glContext.clear(this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT);

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

    // Get data from camera to create the perpective matrix
    const fieldOfView = this.camera.fieldOfViewInRad;
    const aspect = this.renderWidth / this.renderHeight;
    const zNear = this.camera.zNear;
    const zFar = this.camera.zFar;
    const projectionMatrix = this.camera.projectionMatrix;

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

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
