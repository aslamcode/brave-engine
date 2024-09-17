import { Entity, eventActive, InputEventSystemCallback, MovingAverage, ScriptComponent, Time, Vector2, Vector3 } from '@brave/brave-engine';
import { editorInputEvent } from '../input-event/editor-input-event';
import { editorViewInputEvent } from '../input-event/editor-view-input-event';

export class EditorCameraOrbiter extends ScriptComponent {

  private canUpdate = false;
  private running = false;

  mouseSensibility = 10;
  moveSpeed = 5;
  runSpeed = 10;

  private lookAverageX: MovingAverage;
  private lookAverageY: MovingAverage;
  private lookNumberOfSamples = 5;

  private lookPosition = new Vector2();
  private movePosition = new Vector2();

  constructor(entity: Entity, id?: string) {
    super(entity, id);
    this.lookAverageX = new MovingAverage(this.lookNumberOfSamples);
    this.lookAverageY = new MovingAverage(this.lookNumberOfSamples);
    this.listenInputEvents();
  }

  override onRenderUpdate() {
    this.look();
    this.move();
  }

  look() {
    const targetMouseXSmooth = this.lookAverageX.calculate(this.lookPosition.x);
    const targetMouseYSmooth = this.lookAverageY.calculate(this.lookPosition.y);

    this.entity.transform.rotation.x += -targetMouseYSmooth * this.mouseSensibility * Time.unscaledDeltaTime;
    this.entity.transform.rotation.y += -targetMouseXSmooth * this.mouseSensibility * Time.unscaledDeltaTime;

    this.lookPosition = Vector2.zero;
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
    editorViewInputEvent.mouse.right.down(eventActive(this.entity), () => {
      this.canUpdate = true;
    });

    editorViewInputEvent.mouse.right.up(eventActive(this.entity), () => {
      this.canUpdate = false;
    });

    editorInputEvent.mouse.right.up(eventActive(this.entity), () => {
      this.canUpdate = false;
    });

    editorInputEvent.look(1, eventActive(this.entity), (event) => {
      if (this.canUpdate) {
        this.lookPosition = event;
      }
    });

    editorInputEvent.move(eventActive(this.entity), (event) => {
      this.movePosition = event;
    });

    editorInputEvent.keyboard.shiftLeft.down(eventActive(this.entity), () => {
      this.running = true;
    });

    editorInputEvent.keyboard.shiftLeft.up(eventActive(this.entity), () => {
      this.running = false;
    });
  }


}