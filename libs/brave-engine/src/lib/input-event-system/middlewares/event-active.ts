import { Component } from "../../component/component";
import { Entity } from "../../entity/entity";
import { InputEventSystemCallback } from "../input-event-system";

/**
 * Check all parameters is active to continue event calling
 * @param data 
 * @returns void
 */
export function eventActive(...data: (Entity | Component)[]) {
  return (event: any, next: InputEventSystemCallback<any>) => {
    if (data.findIndex(elem => !elem.active) == -1) {
      next(event);
    }
  };
}