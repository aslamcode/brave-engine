import { BraveEngine } from '../brave-engine';
import { Camera } from '../entity/camera';
import { Entity } from '../entity/entity';
import { Light } from '../entity/light';
import { mat4 } from 'gl-matrix';
import { renderVertexShader } from './lib/render-vertex-shader';
import { BraveEngineModeEnum } from '../enum/brave-engine-mode-enum';

export class BraveRender {
  private camera: Camera;

  public lights = new Array<Entity>();

  private renderWidth = 0;
  private renderHeight = 0;

  constructor(
    private braveEngine: BraveEngine,
    private glContext: WebGL2RenderingContext
  ) {
  }

  setRenderSize(width: number, height: number) {
    this.renderWidth = width;
    this.renderHeight = height;
    this.camera.markHasChanges();
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    this.camera.markHasChanges();
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
    if (this.camera.hasChanges) {
      this.updateCameraProjectionMatrix();
      this.updateCameraTransform();
      this.camera.markAsUpdated();
    }

    // Render each game object
    // Call game objects update method
    for (const scene of this.braveEngine.scenes) {
      for (const entity of scene) {
        this.renderEntity(entity);
      }
    }

    // Clear the scene objects and scene lights after render
    this.lights = [];
  }

  private renderEntity(entity: Entity) {
    if (entity.active) {
      if (this.braveEngine.mode === BraveEngineModeEnum.compiled || this.braveEngine.mode === BraveEngineModeEnum.running) {
        entity.onUpdate();
      }

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // To Do: Filtrar objectos que sao luz
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (entity.materials.length > 0) {
        this.renderVertexShader(entity);
      }

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
    const transform = this.camera.transform;

    // Multiply the camera transform matrix by projection matrix
    // This is necessary because camera can have a parent
    const transformWithoutPosition = mat4.clone(transform.worldMatrix);
    mat4.invert(transformWithoutPosition, transformWithoutPosition);
    mat4.multiply(cameraProjectionMatrix, cameraProjectionMatrix, transformWithoutPosition);
  }
}
