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

  keyDown(callback: (event: KeyboardEvent) => void) {
    const type = 'keydown';
    this.listners.push({ type, callback });

    return this.context.addEventListener(type, (event: KeyboardEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  keyPress(callback: (event: KeyboardEvent) => void) {
    const type = 'keypress';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: KeyboardEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  keyUp(callback: (event: KeyboardEvent) => void) {
    const type = 'keyup';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: KeyboardEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseDown(callback: (event: MouseEvent) => void) {
    const type = 'mousedown';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseEnter(callback: (event: MouseEvent) => void) {
    const type = 'mouseenter';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseLeave(callback: (event: MouseEvent) => void) {
    const type = 'mouseleave';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseMove(callback: (event: MouseEvent) => void) {
    const type = 'mousemove';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseOut(callback: (event: MouseEvent) => void) {
    const type = 'mouseout';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseOver(callback: (event: MouseEvent) => void) {
    const type = 'mouseover';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  mouseUp(callback: (event: MouseEvent) => void) {
    const type = 'mouseup';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, (event: MouseEvent) => {
      if (this.innerActive) {
        callback(event);
      }
    });
  }

  removeAllListners() {
    this.listners.forEach(elem => this.context.removeEventListener(elem.type, elem.callback));
    this.listners = [];
  }

}

interface EventListner {
  type: string;
  callback: ((...any: any) => any);
}

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