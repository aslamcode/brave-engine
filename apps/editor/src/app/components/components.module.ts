import { NgModule } from '@angular/core';
import { CanvasModule } from './canvas/canvas.module';

@NgModule({
  imports: [
    CanvasModule
  ],
  exports: [
    CanvasModule
  ]
})
export class ComponentsModule { }
