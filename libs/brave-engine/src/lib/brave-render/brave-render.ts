import { Camera } from '../entity/camera';
import { Entity } from '../entity/entity';
import { Light } from '../entity/light';
import { mat4 } from 'gl-matrix';
import { renderVertexShader } from './lib/render-vertex-shader';
import { degToRad } from '../util/deg-to-rad';
import { Scene } from '../class/scene';

export class BraveRender {
  private camera!: Camera;
  private glContext: WebGL2RenderingContext;

  public scenes = new Array<Scene>();
  public sceneLights = new Array<Entity>();

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
    const [clearColorFloatR, clearColorFloatG, clearColorFloatB, clearColorFloatA] = this.camera.clearColor.floatArrayColor;
    this.glContext.clearColor(
      clearColorFloatR,
      clearColorFloatG,
      clearColorFloatB,
      clearColorFloatA
    );

    this.glContext.clearDepth(1.0); // Clear everything
    this.glContext.enable(this.glContext.DEPTH_TEST); // Enable depth testing
    this.glContext.depthFunc(this.glContext.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    this.glContext.clear(
      this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT
    );

    // Update camera projection matrix and transforms
    this.updateCameraProjectionMatrix();
    this.updateCameraTransform();

    // Render each game object
    // Call game objects update method
    for (const scene of this.scenes) {
      for (const entity of scene)
        if (entity.active) {
          entity.onUpdate();

          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // To Do: Filtrar objectos que sao luz
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          this.renderVertexShader(entity);
        }
    }

    // Clear the scene objects and scene lights after render
    this.sceneLights = [];
  }

  private renderVertexShader(gameObject: Entity) {
    return renderVertexShader(this.glContext, this.camera, gameObject);
  }

  private updateCameraProjectionMatrix() {
    // Get data from camera to create the camera project matrix
    const fieldOfView = this.camera.fieldOfViewInRad;
    const aspect = this.renderWidth / this.renderHeight;
    const zNear = this.camera.zNear;
    const zFar = this.camera.zFar;

    // Update camera projection matrix
    mat4.perspective(this.camera.projectionMatrix, fieldOfView, aspect, zNear, zFar);
  }

  private updateCameraTransform() {
    const cameraProjectionMatrix = this.camera.projectionMatrix;

    // Set position camera render
    // Set position camera render
    mat4.translate(
      this.camera.projectionMatrix, // destination matrix
      this.camera.projectionMatrix, // matrix to translate
      [this.camera.transform.position.x, this.camera.transform.position.y, this.camera.transform.position.z]
    );

    // Set rotation X to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(this.camera.transform.rotation.x), // amount to rotate in radians
      [1, 0, 0]
    ); // axis to rotate around (X)

    // Set rotation Y to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(this.camera.transform.rotation.y), // amount to rotate in radians
      [0, 1, 0]
    ); // axis to rotate around (Y)

    // Set rotation Z to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(this.camera.transform.rotation.z), // amount to rotate in radians
      [0, 0, 1]
    ); // axis to rotate around (Z)
  }
}
