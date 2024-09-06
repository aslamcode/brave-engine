import { filterMouseButtonEvent } from "./filter-mouse-event";
import { InputEventSystemCallback, InputEventSystem } from "./input-event-system";

export class InputEventSystemMouse {

  left: InputEventSystemMouseButton;
  middle: InputEventSystemMouseButton;
  right: InputEventSystemMouseButton;
  wheel: InputEventSystemMouseWheel;

  constructor(
    private inputEventSystem: InputEventSystem
  ) {
    this.createEvents();
  }

  private createEvents() {
    this.left = new InputEventSystemMouseButton(this.inputEventSystem, 0);
    this.middle = new InputEventSystemMouseButton(this.inputEventSystem, 1);
    this.right = new InputEventSystemMouseButton(this.inputEventSystem, 2);
    this.wheel = new InputEventSystemMouseWheel(this.inputEventSystem);
  }

  enter(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEventSystem.mouseEnter(...callback);
  }

  leave(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEventSystem.mouseLeave(...callback);
  }

  move(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEventSystem.mouseMove(...callback);
  }

  out(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEventSystem.mouseOut(...callback);
  }

  over(...callback: InputEventSystemCallback<MouseEvent>[]) {
    return this.inputEventSystem.mouseOver(...callback);
  }
};

export class InputEventSystemMouseButton {
  private filter: InputEventSystemCallback<MouseEvent>;

  constructor(
    private inputEventSystem: InputEventSystem,
    private button: number
  ) {
    this.filter = filterMouseButtonEvent(this.button);
  }

  down(...callback: InputEventSystemCallback<MouseEvent>[]) {
    callback.unshift(this.filter);
    return this.inputEventSystem.mouseDown(...callback);
  }

  up(...callback: InputEventSystemCallback<MouseEvent>[]) {
    callback.unshift(this.filter);
    return this.inputEventSystem.mouseUp(...callback);
  }
}

export class InputEventSystemMouseWheel {

  constructor(
    private inputEventSystem: InputEventSystem
  ) {
  }

  down(...callback: InputEventSystemCallback<MouseEvent>[]) {
    callback.unshift(this.filterWheelDownEvent());
    return this.inputEventSystem.mouseWheel(...callback);
  }

  up(...callback: InputEventSystemCallback<MouseEvent>[]) {
    callback.unshift(this.filterWheelUpEvent());
    return this.inputEventSystem.mouseWheel(...callback);
  }

  private filterWheelDownEvent<T>() {
    return (event: WheelEvent, next?: InputEventSystemCallback<T>) => {
      if (event.deltaY > 0) {
        next(event as T);
      }
    };
  }

  private filterWheelUpEvent<T>() {
    return (event: WheelEvent, next?: InputEventSystemCallback<T>) => {
      if (event.deltaY < 0) {
        next(event as T);
      }
    };
  }
}