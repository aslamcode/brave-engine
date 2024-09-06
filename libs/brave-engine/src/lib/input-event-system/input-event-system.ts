import { Vector2 } from "../class/vector2";
import { MovingAverage } from "../util/class/moving-average";
import { InputEventSystemKeyboard } from "./input-event-system-keyboard";
import { InputEventSystemMouse } from "./input-event-system-mouse";

export class InputEventSystem {

  private innerActive = true;
  get active() { return this.innerActive; }
  set active(active: boolean) { this.innerActive = active; }

  private listners: EventListner[] = [];
  private innerContext: Window | Document | HTMLElement = window;
  get context() { return this.innerContext; }
  set context(context: Window | Document | HTMLElement) { this.removeAllListners(); this.innerContext = context; }

  keyboard: InputEventSystemKeyboard;
  mouse: InputEventSystemMouse;

  constructor() {
    this.keyboard = new InputEventSystemKeyboard(this);
    this.mouse = new InputEventSystemMouse(this);
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

  mouseWheel(...callback: InputEventSystemCallback<MouseEvent>[]) {
    const type = 'wheel';
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

  //#region Custom events

  look(smoothSamples = 1, ...callback: InputEventSystemCallback<Vector2>[]) {
    const next = this.createChainingMiddlewareFunctions<Vector2>(callback);

    const averageX = new MovingAverage(smoothSamples);
    const averageY = new MovingAverage(smoothSamples);

    this.mouseMove((event) => {
      const look = new Vector2(averageX.calculate(event.movementX), averageY.calculate(event.movementY));
      next(look);
    });
  }

  move(...callback: InputEventSystemCallback<Vector2>[]) {
    const type = 'customMove';
    const next = this.createChainingMiddlewareFunctions<Vector2>(callback);

    let move = new Vector2();
    const keys = ['KeyW', 'KeyS', 'KeyD', 'KeyA'];
    let frontDirectionActive = false;
    let backDirectionActive = false;
    let rightDirectionActive = false;
    let leftDirectionActive = false;

    const keyDownListner = this.keyDown((event) => {
      if (!keys.includes(event.code)) {
        return;
      }

      move = move.clone();

      switch (event.code) {
        case 'KeyW':
          frontDirectionActive = true;
          move.y = 1;
          break;

        case 'KeyS':
          backDirectionActive = true;
          move.y = -1;
          break;

        case 'KeyD':
          rightDirectionActive = true;
          move.x = 1;
          break;

        case 'KeyA':
          leftDirectionActive = true;
          move.x = -1;
          break;
      }

      next(move);
    });

    const keyUpListner = this.keyUp((event) => {
      if (!keys.includes(event.code)) {
        return;
      }

      move = move.clone();

      switch (event.code) {
        case 'KeyW':
          frontDirectionActive = false;

          if (!backDirectionActive) {
            move.y = 0;
          } else {
            move.y = -1;
          }
          break;

        case 'KeyS':
          backDirectionActive = false;

          if (!frontDirectionActive) {
            move.y = 0;
          } else {
            move.y = 1;
          }
          break;

        case 'KeyD':
          rightDirectionActive = false;

          if (!leftDirectionActive) {
            move.x = 0;
          } else {
            move.x = -1;
          }
          break;

        case 'KeyA':
          leftDirectionActive = false;

          if (!rightDirectionActive) {
            move.x = 0;
          } else {
            move.x = 1;
          }
          break;
      }

      next(move);
    });

    const children: EventListner[] = [];
    children.push(keyDownListner);
    children.push(keyUpListner);

    const listner: EventListner = { type, children, custom: true };
    this.listners.push(listner);
    return listner;
  }

  //#endregion Custom events

  removeListner(listner: EventListner) {
    if (listner.custom) {
      listner.children?.forEach(elem => {
        this.innerContext.removeEventListener(elem.type, elem.listnerFn);
      });
    } else {
      this.innerContext.removeEventListener(listner.type, listner.listnerFn);
    }

    const index = this.listners.findIndex(elem => elem == listner);
    if (index != -1) {
      this.listners.splice(index, 1);
    }
  }

  removeAllListners() {
    this.listners.forEach(listner => {
      if (listner.custom) {
        listner.children?.forEach(elem => {
          this.innerContext.removeEventListener(elem.type, elem.listnerFn);
        });
      } else {
        this.innerContext.removeEventListener(listner.type, listner.listnerFn);
      }
    });
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
  listnerFn?: ((...any: any) => any);
  custom?: boolean;
  children?: EventListner[];
}

export type InputEventSystemCallback<T> = (event: T, next?: InputEventSystemCallback<T>) => void