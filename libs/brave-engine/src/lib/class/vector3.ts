import { Subject } from "rxjs";

export class Vector3 extends Array<number> {

  onChange = new Subject<Vector3>();

  constructor(x?: number, y?: number, z?: number) {
    super();
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  // Setters

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

  /** Receive a number to set z */
  set z(value: number) {
    this.innerValue[2] = value;
    this.onChange.next(this);
  }

  // Getters

  /** Return x number value */
  get x() { return this.innerValue[0]; }

  /** Return y number value */
  get y() { return this.innerValue[1]; }

  /** Return z number value */
  get z() { return this.innerValue[2]; }

  static get up() { return new Vector3(0, 1, 0); }
  static get right() { return new Vector3(1, 0, 0); }
  static get down() { return new Vector3(0, -1, 0); }
  static get left() { return new Vector3(-1, 0, 0); }
  static get forward() { return new Vector3(0, 0, 1); }
  static get back() { return new Vector3(0, 0, -1); }
  static get one() { return new Vector3(1, 1, 1); }
  static get negativeInfinity() { return new Vector3(-Infinity, -Infinity, -Infinity); }
  static get positiveInfinity() { return new Vector3(Infinity, Infinity, Infinity); }
  static get zero() { return new Vector3(0, 0, 0); }

  private get innerValue() {
    return this.valueOf() as Array<number>;
  }
}
