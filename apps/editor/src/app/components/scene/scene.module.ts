import { NgModule } from '@angular/core';
import { SceneComponent } from './scene.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@brave/ui';

@NgModule({
  declarations: [
    SceneComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    SceneComponent
  ]
})
export class SceneModule { }
