import { NgModule } from '@angular/core';
import { CanvasModule } from './canvas/canvas.module';
import { SceneModule } from './scene/scene.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  imports: [
    CanvasModule,
    SceneModule,
    SettingsModule
  ],
  exports: [
    CanvasModule,
    SceneModule,
    SettingsModule
  ]
})
export class ComponentsModule { }
