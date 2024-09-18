import { Vector2 } from '../class/vector2';
import { EventListner, InputEventSystem, InputEventSystemCallback } from '../input-event-system/input-event-system';

export class Input {

  private static inputEvent = new InputEventSystem();

  static get active() { return this.inputEvent.active; }
  static set active(active: boolean) { this.inputEvent.active = active; }

  static get context() { return this.inputEvent.context; }
  static set context(context: Window | Document | HTMLElement) { this.removeAllListners(); this.inputEvent.context = context; }

  static get keyboard() { return this.inputEvent.keyboard; }
  static get mouse() { return this.inputEvent.mouse; }

  //#region Base events

  static keyDown(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    return this.inputEvent.keyDown(...callback);
  }

  static keyPress(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    return this.inputEvent.keyPress(...callback);
  }

  static keyUp(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    return this.inputEvent.keyUp(...callback);
  }

  static mouseDown(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseDown(...callback);
  }

  static mouseEnter(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseEnter(...callback);
  }

  static mouseLeave(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseLeave(...callback);
  }

  static mouseMove(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseMove(...callback);
  }

  static mouseOut(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseOut(...callback);
  }

  static mouseOver(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseOver(...callback);
  }

  static mouseUp(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseUp(...callback);
  }

  static mouseWheel(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEvent.mouseWheel(...callback);
  }

  //#endregion Base events

  //#region Custom events

  static look(smoothSamples = 1, ...callback: InputEventSystemCallback<Vector2>[]) {
    return this.inputEvent.look(smoothSamples, ...callback);
  }

  static move(...callback: InputEventSystemCallback<Vector2>[]) {
    return this.inputEvent.move(...callback);
  }

  //#endregion Custom events

  static removeListner(listener: EventListner) {
    return this.inputEvent.removeListner(listener);
  }

  static removeAllListners() {
    return this.inputEvent.removeAllListners();
  }

}