import { braveEngine } from '../brave-engine';

export class Cursor {

  /**
   * Lock cursor in game view or in an element if needed
   */
  static lock(element?: HTMLElement, options: CursorLockOptions = { unadjustedMovement: true }) {
    if (element) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return element.requestPointerLock(options);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return braveEngine.canvasElement.requestPointerLock(options);
  }

  /**
   * Unlock cursor 
   */
  static unlock() {
    return document.exitPointerLock();
  }
}

interface CursorLockOptions {
  unadjustedMovement: boolean;
}