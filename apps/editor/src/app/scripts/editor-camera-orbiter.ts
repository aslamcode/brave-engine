import { Entity, ScriptComponent, Time, Vector2, Vector3 } from '@brave/brave-engine';
import { editorInputEvent } from '../input-event/editor-input-event';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

export class EditorCameraOrbiter extends ScriptComponent {

  private canUpdate = false;
  private running = false;

  mouseSensibility = 10;
  moveSpeed = 3;
  runSpeed = 7;

  private startMouseX = 0;
  private startMouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private lookSamplesX: number[] = [];
  private lookSamplesY: number[] = [];
  private lookNumberOfSamples = 5;
  private lookSampleIndex = 0;

  private movePosition = new Vector2();
  private frontDirectionActive = false;
  private backDirectionActive = false;
  private rightDirectionActive = false;
  private leftDirectionActive = false;

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.listenInputEvents();
  }

  override onRenderUpdate() {
    this.look();
    this.move();
  }

  look() {
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

    const speed = this.running ? this.runSpeed : this.moveSpeed;

    const backwardDirection = this.entity.transform.backward;
    const rightDirection = this.entity.transform.right;
    const frontMove = Vector3.one;
    const sideMove = Vector3.one;

    const frontSpeed = this.movePosition.y * speed * Time.unscaledDeltaTime;
    const sideSpeed = this.movePosition.x * speed * Time.unscaledDeltaTime;

    Vector3.multiply(frontMove, backwardDirection, new Vector3(frontSpeed, frontSpeed, frontSpeed));
    Vector3.multiply(sideMove, rightDirection, new Vector3(sideSpeed, sideSpeed, sideSpeed));

    Vector3.add(this.entity.transform.position, this.entity.transform.position, frontMove);
    Vector3.add(this.entity.transform.position, this.entity.transform.position, sideMove);
  }

  private listenInputEvents() {
    editorViewInputEvent.mouse.right.down((event) => {
      this.canUpdate = true;
      this.startMouseX = event.x;
      this.startMouseY = event.y;
    });

    editorViewInputEvent.mouse.right.up(() => {
      this.canUpdate = false;
    });

    editorInputEvent.mouse.right.up(() => {
      this.canUpdate = false;
    });

    editorInputEvent.mouse.wheel.up((event) => {

    });

    editorInputEvent.mouse.wheel.down((event) => {

    });

    editorInputEvent.mouse.move((event) => {
      if (this.canUpdate) {
        this.targetMouseX = event.y - this.startMouseY;
        this.targetMouseY = event.x - this.startMouseX;
        this.startMouseX = event.x;
        this.startMouseY = event.y;
      }
    });

    editorInputEvent.keyboard.keyW.down(() => {
      this.frontDirectionActive = true;
      this.movePosition.y = 1;
    });

    editorInputEvent.keyboard.keyS.down(() => {
      this.backDirectionActive = true;
      this.movePosition.y = -1;
    });

    editorInputEvent.keyboard.keyD.down(() => {
      this.rightDirectionActive = true;
      this.movePosition.x = 1;
    });

    editorInputEvent.keyboard.keyA.down(() => {
      this.leftDirectionActive = true;
      this.movePosition.x = -1;
    });

    editorInputEvent.keyboard.shiftLeft.down(() => {
      this.running = true;
    });

    editorInputEvent.keyboard.keyW.up(() => {
      this.frontDirectionActive = false;

      if (!this.backDirectionActive) {
        this.movePosition.y = 0;
      } else {
        this.movePosition.y = -1;
      }
    });

    editorInputEvent.keyboard.keyS.up(() => {
      this.backDirectionActive = false;

      if (!this.frontDirectionActive) {
        this.movePosition.y = 0;
      } else {
        this.movePosition.y = 1;
      }
    });

    editorInputEvent.keyboard.keyD.up(() => {
      this.rightDirectionActive = false;

      if (!this.leftDirectionActive) {
        this.movePosition.x = 0;
      } else {
        this.movePosition.x = -1;
      }
    });

    editorInputEvent.keyboard.keyA.up(() => {
      this.leftDirectionActive = false;

      if (!this.rightDirectionActive) {
        this.movePosition.x = 0;
      } else {
        this.movePosition.x = 1;
      }
    });

    editorInputEvent.keyboard.shiftLeft.up(() => {
      this.running = false;
    });
  }
}