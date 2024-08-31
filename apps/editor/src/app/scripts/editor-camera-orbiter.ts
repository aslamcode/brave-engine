import { Entity, ScriptComponent, Vector2, Vector3 } from '@brave/brave-engine';
import { editorInputEvent } from '../input-event/editor-input-event';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

export class EditorCameraOrbiter extends ScriptComponent {

  canUpdate = false;
  canUpdateCameraRotation = false;
  mouseSensibility = 5;

  private startMouseX = 0;
  private startMouseY = 0;
  private currentMouseX = 0;
  private currentMouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private movePosition = new Vector2();

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.listenInputEvents();
  }

  override onRenderUpdate() {
    // this.look();
    this.move();
  }

  look() {
    if (!this.canUpdate) {
      return;
    }

    this.entity.transform.rotation.x += this.targetMouseX * this.mouseSensibilityScaled;
    this.entity.transform.rotation.y += this.targetMouseY * this.mouseSensibilityScaled;
  }

  move() {
    if (!this.canUpdate) {
      return;
    }

    // Vector3.multiply(this.entity.transform.position, this.entity.transform.rotation, new Vector3(this.movePosition.x, 0, this.movePosition.y));

    this.entity.transform.position.x += this.movePosition.x;
    this.entity.transform.position.z += this.movePosition.y;
  }

  private listenInputEvents() {
    editorViewInputEvent.mouseDown((event) => {
      if (event.button == 2) {
        this.canUpdate = true;
        this.startMouseX = event.x;
        this.startMouseY = event.y;
        this.currentMouseX = event.x;
        this.currentMouseY = event.y;
      }
    });

    editorViewInputEvent.mouseUp((event) => {
      if (event.button == 2) {
        this.canUpdate = false;
        this.resetMouseLook();
      }
    });

    editorInputEvent.mouseUp((event) => {
      if (event.button == 2) {
        this.canUpdate = false;
        this.resetMouseLook();
      }
    });

    editorInputEvent.mouseMove((event) => {
      if (this.canUpdate) {
        this.canUpdateCameraRotation = true;
        this.currentMouseX = event.x;
        this.currentMouseY = event.y;

        this.targetMouseX = this.startMouseY - this.currentMouseY;
        this.targetMouseY = this.startMouseX - this.currentMouseX;

        this.startMouseX = this.currentMouseX;
        this.startMouseY = this.currentMouseY;

        this.look();
      }
    });

    editorInputEvent.keyDown((event) => {
      if (event.code == 'KeyW') {
        this.movePosition.y = -1;
      }

      if (event.code == 'KeyS') {
        this.movePosition.y = 1;
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

  private resetMouseLook() {
    this.startMouseX = 0;
    this.startMouseY = 0;
    this.currentMouseX = 0;
    this.currentMouseY = 0;
  }

  private get mouseSensibilityScaled() {
    return this.mouseSensibility / 50;
  }
}