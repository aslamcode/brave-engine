import { BraveEngine } from '../brave-engine';
import { Camera } from '../entity/camera';
import { Entity } from '../entity/entity';
import { Light } from '../entity/light';
import { mat4 } from 'gl-matrix';
import { renderVertexShader } from './lib/render-vertex-shader';
import { degToRad } from '../util/deg-to-rad';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';

export class BraveRender {
  private camera: Camera;

  public lights = new Array<Entity>();

  private renderWidth = 0;
  private renderHeight = 0;

  private lastUpdatedTime = 0;

  constructor(
    private braveEngine: BraveEngine,
    private glContext: WebGL2RenderingContext
  ) {
  }

  setRenderSize(width: number, height: number) {
    this.renderWidth = width;
    this.renderHeight = height;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  addLight(light: Light) {
    this.lights.push(light);
  }

  render() {
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
    for (const scene of this.braveEngine.scenes) {
      for (const entity of scene)
        this.renderEntity(entity);
    }

    // Clear the scene objects and scene lights after render
    this.lights = [];
  }

  private renderEntity(entity: Entity) {
    if (entity.active) {
      if (this.braveEngine.mode === BraveEngineModeEnum.running) {
        entity.onUpdate();
      }

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // To Do: Filtrar objectos que sao luz
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.renderVertexShader(entity);

      // Render deep each entity
      entity.children.forEach(elem => this.renderEntity(elem));
    }
  }

  private renderVertexShader(entity: Entity) {
    return renderVertexShader(this.glContext, this.camera, entity);
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
    mat4.translate(
      this.camera.projectionMatrix, // destination matrix
      this.camera.projectionMatrix, // matrix to translate
      [-this.camera.transform.position.x, -this.camera.transform.position.y, -this.camera.transform.position.z]
    );

    // Set rotation X to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(-this.camera.transform.rotation.x), // amount to rotate in radians
      [1, 0, 0]
    ); // axis to rotate around (X)

    // Set rotation Y to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(-this.camera.transform.rotation.y), // amount to rotate in radians
      [0, 1, 0]
    ); // axis to rotate around (Y)

    // Set rotation Z to camera
    mat4.rotate(
      cameraProjectionMatrix, // destination matrix
      cameraProjectionMatrix, // matrix to rotate
      degToRad(-this.camera.transform.rotation.z), // amount to rotate in radians
      [0, 0, 1]
    ); // axis to rotate around (Z)
  }
}
