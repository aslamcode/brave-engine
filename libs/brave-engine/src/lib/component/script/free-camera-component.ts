import { Vector2 } from '../../class/vector2';
import { Vector3 } from '../../class/vector3';
import { Entity } from '../../entity/entity';
import { Input } from '../../static/input';
import { Time } from '../../static/time';
import { MovingAverage } from '../../util/class/moving-average';
import { ScriptComponent } from './script-component';

export class FreeCameraComponent extends ScriptComponent {
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
  }

  onStart() {
    this.listenInputEvents();
  }

  onUpdate() {
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
    Input.look(1, (event) => {
      this.lookPosition = event;
    });

    Input.move((event) => {
      this.movePosition = event;
    });

    Input.keyboard.shiftLeft.down(() => {
      this.running = true;
    });

    Input.keyboard.shiftLeft.up(() => {
      this.running = false;
    });
  }
}