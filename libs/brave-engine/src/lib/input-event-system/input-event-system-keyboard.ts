import { filterKeyboardEvent } from "./filter-keyboard-event";
import { InputEventSystemCallback, InputEventSystem } from "./input-event-system";
import { keyboardKeyEventNames } from "./keyboard-key-event-names";

export class InputEventSystemKeyboard {

  backspace: InputEventSystemKey;
  tab: InputEventSystemKey;
  enter: InputEventSystemKey;
  shiftLeft: InputEventSystemKey;
  shiftRight: InputEventSystemKey;
  controlLeft: InputEventSystemKey;
  controlRight: InputEventSystemKey;
  altLeft: InputEventSystemKey;
  altRight: InputEventSystemKey;
  pause: InputEventSystemKey;
  capsLock: InputEventSystemKey;
  escape: InputEventSystemKey;
  space: InputEventSystemKey;
  pageUp: InputEventSystemKey;
  pageDown: InputEventSystemKey;
  end: InputEventSystemKey;
  home: InputEventSystemKey;
  arrowLeft: InputEventSystemKey;
  arrowUp: InputEventSystemKey;
  arrowRight: InputEventSystemKey;
  arrowDown: InputEventSystemKey;
  printScreen: InputEventSystemKey;
  insert: InputEventSystemKey;
  delete: InputEventSystemKey;
  digit0: InputEventSystemKey;
  digit1: InputEventSystemKey;
  digit2: InputEventSystemKey;
  digit3: InputEventSystemKey;
  digit4: InputEventSystemKey;
  digit5: InputEventSystemKey;
  digit6: InputEventSystemKey;
  digit7: InputEventSystemKey;
  digit8: InputEventSystemKey;
  digit9: InputEventSystemKey;
  keyA: InputEventSystemKey;
  keyB: InputEventSystemKey;
  keyC: InputEventSystemKey;
  keyD: InputEventSystemKey;
  keyE: InputEventSystemKey;
  keyF: InputEventSystemKey;
  keyG: InputEventSystemKey;
  keyH: InputEventSystemKey;
  keyI: InputEventSystemKey;
  keyJ: InputEventSystemKey;
  keyK: InputEventSystemKey;
  keyL: InputEventSystemKey;
  keyM: InputEventSystemKey;
  keyN: InputEventSystemKey;
  keyO: InputEventSystemKey;
  keyP: InputEventSystemKey;
  keyQ: InputEventSystemKey;
  keyR: InputEventSystemKey;
  keyS: InputEventSystemKey;
  keyT: InputEventSystemKey;
  keyU: InputEventSystemKey;
  keyV: InputEventSystemKey;
  keyW: InputEventSystemKey;
  keyX: InputEventSystemKey;
  keyY: InputEventSystemKey;
  keyZ: InputEventSystemKey;
  metaLeft: InputEventSystemKey;
  metaRight: InputEventSystemKey;
  contextMenu: InputEventSystemKey;
  numpad0: InputEventSystemKey;
  numpad1: InputEventSystemKey;
  numpad2: InputEventSystemKey;
  numpad3: InputEventSystemKey;
  numpad4: InputEventSystemKey;
  numpad5: InputEventSystemKey;
  numpad6: InputEventSystemKey;
  numpad7: InputEventSystemKey;
  numpad8: InputEventSystemKey;
  numpad9: InputEventSystemKey;
  numpadMultiply: InputEventSystemKey;
  numpadAdd: InputEventSystemKey;
  numpadSubtract: InputEventSystemKey;
  numpadDecimal: InputEventSystemKey;
  numpadDivide: InputEventSystemKey;
  f1: InputEventSystemKey;
  f2: InputEventSystemKey;
  f3: InputEventSystemKey;
  f4: InputEventSystemKey;
  f5: InputEventSystemKey;
  f6: InputEventSystemKey;
  f7: InputEventSystemKey;
  f8: InputEventSystemKey;
  f9: InputEventSystemKey;
  f10: InputEventSystemKey;
  f11: InputEventSystemKey;
  f12: InputEventSystemKey;
  numLock: InputEventSystemKey;
  scrollLock: InputEventSystemKey;
  semicolon: InputEventSystemKey;
  equal: InputEventSystemKey;
  comma: InputEventSystemKey;
  minus: InputEventSystemKey;
  period: InputEventSystemKey;
  slash: InputEventSystemKey;
  backquote: InputEventSystemKey;
  bracketLeft: InputEventSystemKey;
  backslash: InputEventSystemKey;
  bracketRight: InputEventSystemKey;
  quote: InputEventSystemKey;

  constructor(
    private inputEventSystem: InputEventSystem
  ) {
    this.createEvents();
  }

  private createEvents() {
    keyboardKeyEventNames.forEach(keyName => {
      const prop = `${keyName[0].toLowerCase()}${keyName.substring(1)}`;
      this[prop] = new InputEventSystemKey(this.inputEventSystem, keyName);
    });
  }
};

export class InputEventSystemKey {
  private filter: InputEventSystemCallback<KeyboardEvent>;

  constructor(
    private inputEventSystem: InputEventSystem,
    private keyName: string
  ) {
    this.filter = filterKeyboardEvent(this.keyName);
  }

  down(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    callback.unshift(this.filter);
    return this.inputEventSystem.keyDown(...callback);
  }

  press(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    callback.unshift(this.filter);
    return this.inputEventSystem.keyPress(...callback);
  }

  up(...callback: InputEventSystemCallback<KeyboardEvent>[]) {
    callback.unshift(this.filter);
    return this.inputEventSystem.keyUp(...callback);
  }
}