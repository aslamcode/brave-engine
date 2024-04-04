import { Injectable } from '@angular/core';
import { Entity } from '@brave/brave-engine';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  entity?: Entity;

  constructor() {

  }

  setEntity(entity: Entity) {
    this.entity = entity;
  }
}