export class InputEventSystem {

  innerActive = true;
  get active() { return this.innerActive; }
  listners: EventListner[] = [];
  context: Window | Document | HTMLElement = window;

  setActive(active: boolean) {
    this.innerActive = active;
  }

  setContext(context: Window | Document | HTMLElement) {
    this.context = context;
  }

  //#region Base events

  keyDown(...callback: EventCallback<KeyboardEvent>[]) {
    const type = 'keydown';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  keyPress(...callback: EventCallback<KeyboardEvent>[]) {
    const type = 'keypress';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  keyUp(...callback: EventCallback<KeyboardEvent>[]) {
    const type = 'keyup';
    const next = this.createChainingMiddlewareFunctions<KeyboardEvent>(callback);
    const listnerFn = (event: KeyboardEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseDown(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mousedown';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseEnter(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mouseenter';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseLeave(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mouseleave';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseMove(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mousemove';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseOut(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mouseout';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseOver(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mouseover';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  mouseUp(...callback: EventCallback<MouseEvent>[]) {
    const type = 'mouseup';
    const next = this.createChainingMiddlewareFunctions<MouseEvent>(callback);
    const listnerFn = (event: MouseEvent) => {
      if (this.innerActive) {
        next(event);
      }
    };

    this.context.addEventListener(type, listnerFn);

    const listner: EventListner = { type, listnerFn };
    this.listners.push(listner);
    return listner;
  }

  //#endregion Base events

  removeListner(listner: EventListner) {
    this.context.removeEventListener(listner.type, listner.listnerFn);
  }

  removeAllListners() {
    this.listners.forEach(elem => this.context.removeEventListener(elem.type, elem.listnerFn));
    this.listners = [];
  }

  private createChainingMiddlewareFunctions<T>(functions: EventCallback<T>[]) {
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

interface EventListner {
  type: string;
  listnerFn: ((...any: any) => any);
}

type EventCallback<T> = (event: T, next?: EventCallback<T>) => void

// editorViewInputEvent.keyW.down(() => {

// });

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

// editorViewInputEvent.shiftLeft(() => {

// });