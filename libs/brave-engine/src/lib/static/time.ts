export class Time {
  static deltaTime = 0;
  static renderTime = 0;

  /**
   * Return real FPS
   */
  static get fps() {
    return 1 / this.deltaTime;
  }

  /**
   * Return theoretical FPS
   */
  static get tFps() {
    return 1 / this.renderTime;
  }
}