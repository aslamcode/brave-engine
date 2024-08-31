export class InputEventSystem {

  listners: EventListner[] = [];
  context: Window | Document | HTMLElement = window;

  setContext(context: Window | Document | HTMLElement) {
    this.context = context;
  }

  keyDown(callback: (event: KeyboardEvent) => void) {
    const type = 'keydown';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  keyPress(callback: (event: KeyboardEvent) => void) {
    const type = 'keypress';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  keyUp(callback: (event: KeyboardEvent) => void) {
    const type = 'keyup';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseDown(callback: (event: MouseEvent) => void) {
    const type = 'mousedown';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseEnter(callback: (event: MouseEvent) => void) {
    const type = 'mouseenter';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseLeave(callback: (event: MouseEvent) => void) {
    const type = 'mouseleave';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseMove(callback: (event: MouseEvent) => void) {
    const type = 'mousemove';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseOut(callback: (event: MouseEvent) => void) {
    const type = 'mouseout';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseOver(callback: (event: MouseEvent) => void) {
    const type = 'mouseover';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
  }

  mouseUp(callback: (event: MouseEvent) => void) {
    const type = 'mouseup';
    this.listners.push({ type, callback });
    return this.context.addEventListener(type, callback);
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