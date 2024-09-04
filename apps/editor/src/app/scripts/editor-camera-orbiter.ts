import { Camera, Entity, ScriptComponent, Time, Vector2, Vector3 } from '@brave/brave-engine';
import { editorInputEvent } from '../input-event/editor-input-event';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

export class EditorCameraOrbiter extends ScriptComponent {

  private camera: Camera;

  canUpdate = false;
  mouseSensibility = 10;
  moveSpeed = 3;

  private startMouseX = 0;
  private startMouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private lookSamplesX: number[] = [];
  private lookSamplesY: number[] = [];
  private lookNumberOfSamples = 5;
  private lookSampleIndex = 0;

  private movePosition = new Vector2();

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.camera = this.entity as Camera;
    this.listenInputEvents();
  }

  override onRenderUpdate() {
    this.look();
    this.move();
  }

  look() {
    if (!this.canUpdate) {
      return;
    }

    if (this.lookSampleIndex > this.lookNumberOfSamples - 1) {
      this.lookSampleIndex = 0;
    }

    this.lookSamplesX[this.lookSampleIndex] = this.targetMouseX;
    this.lookSamplesY[this.lookSampleIndex] = this.targetMouseY;

    this.lookSampleIndex++;

    const targetMouseXSmooth = this.lookSamplesX.reduce((previous, current) => previous + current) / this.lookNumberOfSamples;
    const targetMouseYSmooth = this.lookSamplesY.reduce((previous, current) => previous + current) / this.lookNumberOfSamples;

    this.entity.transform.rotation.x += -targetMouseXSmooth * this.mouseSensibility * Time.unscaledDeltaTime;
    this.entity.transform.rotation.y += -targetMouseYSmooth * this.mouseSensibility * Time.unscaledDeltaTime;

    this.targetMouseX = 0;
    this.targetMouseY = 0;
  }

  move() {
    if (!this.canUpdate) {
      return;
    }

    const backwardDirection = this.entity.transform.backward;
    const rightDirection = this.entity.transform.right;
    const frontMove = Vector3.one;
    const sideMove = Vector3.one;

    const frontSpeed = this.movePosition.y * this.moveSpeed * Time.unscaledDeltaTime;
    const sideSpeed = this.movePosition.x * this.moveSpeed * Time.unscaledDeltaTime;

    Vector3.multiply(frontMove, backwardDirection, new Vector3(frontSpeed, frontSpeed, frontSpeed));
    Vector3.multiply(sideMove, rightDirection, new Vector3(sideSpeed, sideSpeed, sideSpeed));

    Vector3.add(this.entity.transform.position, this.entity.transform.position, frontMove);
    Vector3.add(this.entity.transform.position, this.entity.transform.position, sideMove);
  }

  private listenInputEvents() {
    editorInputEvent.keyDown((event) => {
      if (event.code == 'KeyW') {
        this.movePosition.y = 1;
      }
    });

    editorViewInputEvent.mouseDown((event) => {
      if (event.button == 2) {
        this.canUpdate = true;
        this.startMouseX = event.x;
        this.startMouseY = event.y;
      }
    });

    editorViewInputEvent.mouseUp((event) => {
      if (event.button == 2) {
        this.canUpdate = false;
      }
    });

    editorInputEvent.mouseUp((event) => {
      if (event.button == 2) {
        this.canUpdate = false;
      }
    });

    editorInputEvent.mouseMove((event) => {
      if (this.canUpdate) {
        this.targetMouseX = event.y - this.startMouseY;
        this.targetMouseY = event.x - this.startMouseX;

        this.startMouseX = event.x;
        this.startMouseY = event.y;
      }
    });

    editorInputEvent.keyDown((event) => {
      if (event.code == 'KeyW') {
        this.movePosition.y = 1;
      }

      if (event.code == 'KeyS') {
        this.movePosition.y = -1;
      }

      if (event.code == 'KeyD') {
        this.movePosition.x = 1;
      }

      if (event.code == 'KeyA') {
        this.movePosition.x = -1;
      }
    });

    editorInputEvent.keyUp((event) => {
      if (event.code == 'KeyW') {
        this.movePosition.y = 0;
      }

      if (event.code == 'KeyS') {
        this.movePosition.y = 0;
      }

      if (event.code == 'KeyD') {
        this.movePosition.x = 0;
      }

      if (event.code == 'KeyA') {
        this.movePosition.x = 0;
      }
    });
  }
}