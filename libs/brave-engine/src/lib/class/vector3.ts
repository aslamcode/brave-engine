import { Subject } from "rxjs";

export class Vector3 extends Array<number> {

  onChange = new Subject<Vector3>();

  constructor(x?: number, y?: number, z?: number) {
    super();
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
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

  /** Receive a number to set z */
  set z(value: number) {
    this.innerValue[2] = value;
    this.onChange.next(this);
  }

  //#endregion Setters

  //#region Getters

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

  //#endregion Getters

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  //#region Extra methods

  static add(vectorResult: Vector3, vectorA: Vector3, vectorB?: Vector3) {
    if (vectorB) {
      const { x, y, z } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;
      const bZ = vectorB.z;

      vectorResult.x = x + bX;
      vectorResult.y = y + bY;
      vectorResult.z = z + bZ;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
      vectorResult.z = vectorA.z;
    }
  }

  static multiply(vectorResult: Vector3, vectorA: Vector3, vectorB?: Vector3) {
    if (vectorB) {
      const { x, y, z } = vectorA;
      const bX = vectorB.x;
      const bY = vectorB.y;
      const bZ = vectorB.z;

      vectorResult.x = x * bX;
      vectorResult.y = y * bY;
      vectorResult.z = z * bZ;
    } else {
      vectorResult.x = vectorA.x;
      vectorResult.y = vectorA.y;
      vectorResult.z = vectorA.z;
    }
  }

  static distance(vectorA: Vector3, vectorB: Vector3) {
    const x = vectorA.x - vectorB.x;
    const y = vectorA.y - vectorB.y;
    const z = vectorA.z - vectorB.z;
    return Math.hypot(x, y, z);
  }

  //#endregion Extra methods
}
