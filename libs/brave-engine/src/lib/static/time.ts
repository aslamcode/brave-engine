export class Time {
  static unscaledDeltaTime = 0;
  static renderTime = 0;
  static scale = 1;

  /**
   * Return delta time based on scale
   */
  static get deltaTime() {
    return this.unscaledDeltaTime * this.scale;
  }

  /**
   * Return real FPS
   */
  static get fps() {
    return 1 / this.unscaledDeltaTime;
  }

  /**
   * Return theoretical FPS
   */
  static get tFps() {
    return 1 / this.renderTime;
  }
}