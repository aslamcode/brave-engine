import { rgbaColorArrayToFloatColorArray } from '../util/color/rgba-color-array-to-float-color-array';
import { rgbaColorToFloatColor } from '../util/color/rgba-color-to-float-color';

export class RgbaColor extends Array<number> {

  floatArrayColor = [0, 0, 0, 0];

  constructor(r: number, g: number, b: number, a: number) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.floatArrayColor = rgbaColorArrayToFloatColorArray(this.innerValue);
  }

  setValue(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.floatArrayColor = rgbaColorArrayToFloatColorArray(this.innerValue);
  }

  // Setters

  /** Receive an Integer number between 0 and 255 */
  set r(value: number) {
    this.innerValue[0] = value;
    this.floatArrayColor[0] = rgbaColorToFloatColor(value);
  }

  /** Receive an Integer number between 0 and 255 */
  set g(value: number) {
    this.innerValue[1] = value;
    this.floatArrayColor[1] = rgbaColorToFloatColor(value);
  }

  /** Receive an Integer number between 0 and 255 */
  set b(value: number) {
    this.innerValue[2] = value;
    this.floatArrayColor[2] = rgbaColorToFloatColor(value);
  }

  /** Receive an Float number between 0 and 1 */
  set a(value: number) {
    this.innerValue[3] = value;
    this.floatArrayColor[3] = rgbaColorToFloatColor(value);
  }

  // Getters

  /** Return an Integer number between 0 and 255 */
  get r() { return this.innerValue[0]; }

  /** Return an Integer number between 0 and 255 */
  get g() { return this.innerValue[1]; }

  /** Return an Integer number between 0 and 255 */
  get b() { return this.innerValue[2]; }

  /** Return an Float number between 0 and 1 */
  get a() { return this.innerValue[4]; }

  private get innerValue() {
    return this.valueOf() as Array<number>;
  }
}