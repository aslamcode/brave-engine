import { InputEventSystemCallback } from "./input-event-system";

export function filterKeyboardEvent<T>(eventCode: string) {
  return (event: KeyboardEvent, next?: InputEventSystemCallback<T>) => {
    if (event.code === eventCode) {
      next(event as T);
    }
  };
}