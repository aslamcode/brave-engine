import { InputEventSystemCallback } from "./input-event-system";

export function filterMouseButtonEvent<T>(button: number) {
  return (event: MouseEvent, next?: InputEventSystemCallback<T>) => {
    if (event.button === button) {
      next(event as T);
    }
  };
}