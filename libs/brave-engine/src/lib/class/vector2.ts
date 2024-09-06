import { Subject } from "rxjs";
import { Vector3 } from "./vector3";

export class Vector2 extends Array<number> {

  onChange = new Subject<Vector2>();

  constructor(x?: number, y?: number) {
    super();
    this.x = x || 0;
    this.y = y || 0;
  }

  //#region Setters 

  /** Receive a number to set x */
  set x(value: number) {
    this.innerValue[0] = value;
    this.onChange.next(this);
  }

  /** Receive a number to set y */
  set y(value: number) {
    this.innerValue[1] = value;
    this.onChange.next(this);
  }

  //#endregion Setters

  //#region Getters

  /** Return x number value */
  get x() { return this.innerValue[0]; }

  /** Return y number value */
  get y() { return this.innerValue[1]; }

  static get up() { return new Vector2(0, 1); }
  static get right() { return new Vector2(1, 0); }
  static get down() { return new Vector2(0, -1); }
  static get left() { return new Vector2(-1, 0); }
  static get one() { return new Vector2(1, 1); }
  static get negativeInfinity() { return new Vector2(-Infinity, -Infinity); }
  static get positiveInfinity() { return new Vector2(Infinity, Infinity); }
  static get zero() { return new Vector2(0, 0); }

  private get innerValue() {
    return this.valueOf() as Array<number>;
  }

  //#endregion Getters

  clone() {
    return new Vector2(this.x, this.y);
  }

  //#region Extra methods

  static add(vectorResult: Vector2, vectorA: Vector2, vectorB?: Vector2) {
    if (vectorB) {
      const { x, y } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;

      vectorResult.x = x + bX;
      vectorResult.y = y + bY;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
    }
  }

  static multiply(vectorResult: Vector2, vectorA: Vector2, vectorB?: Vector2) {
    if (vectorB) {
      const { x, y } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;

      vectorResult.x = x * bX;
      vectorResult.y = y * bY;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
    }
  }

  static distance(vectorA: Vector2, vectorB: Vector2) {
    const x = vectorA.x - vectorB.x;
    const y = vectorA.y - vectorB.y;
    return Math.hypot(x, y);
  }

  //#endregion Extra methods
}
