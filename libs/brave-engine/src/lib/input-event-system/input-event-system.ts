import { InputEventSystemKeyboard } from "./input-event-system-keyboard";

export class InputEventSystem {

  private innerActive = true;
  get active() { return this.innerActive; }
  set active(active: boolean) { this.innerActive = active; }

  private listners: EventListner[] = [];
  private innerContext: Window | Document | HTMLElement = window;
  get context() { return this.innerContext; }
  set context(context: Window | Document | HTMLElement) { this.removeAllListners(); this.innerContext = context; }

  keyboard: InputEventSystemKeyboard;

  constructor() {
    this.keyboard = new InputEventSystemKeyboard(this);
  }

  //#region Base events

  keyDown(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    const type = 'keydown';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  keyPress(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    const type = 'keypress';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  keyUp(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    const type = 'keyup';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseDown(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mousedown';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseEnter(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mouseenter';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseLeave(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mouseleave';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseMove(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mousemove';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseOut(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mouseout';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseOver(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mouseover';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseUp(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'mouseup';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.innerContext.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  //#endregion Base events

  removeListner(listner: EventListner) {
    this.innerContext.removeEventListener(listner.type, listner.listnerFn);
    const index = this.listners.findIndex(elem => elem == listner);
    if (index != -1) {
      this.listners.splice(index, 1);
    }
  }

  removeAllListners() {
    this.listners.forEach(elem => this.innerContext.removeEventListener(elem.type, elem.listnerFn));
    this.listners = [];
  }

  private createChainingMiddlewareFunctions<T>(functions: InputEventSystemCallback<T>[]) {
    let callbackIndex = 0;

    const nextFn = (event: T) => {
      if (functions[callbackIndex]) {
        functions[callbackIndex++](event, nextFn);
      }
    };

    const callback = (event: T) => {
      callbackIndex = 0;
      nextFn(event);
    };

    return callback;
  }

}

export interface EventListner {
  type: string;
  listnerFn: ((...any: any) => any);
}

export type InputEventSystemCallback<T> = (event: T, next?: InputEventSystemCallback<T>) => void


// editorViewInputEvent.mouseLeft.down(() => {

// });

// editorViewInputEvent.mouseMiddle.down(() => {

// });

// editorViewInputEvent.mouseRight.down(() => {

// });

// editorViewInputEvent.scroll.up(() => {

// });

// editorViewInputEvent.scroll.down(() => {

// });

// editorViewInputEvent.move(() => {

// });

// editorViewInputEvent.look(() => {

// });