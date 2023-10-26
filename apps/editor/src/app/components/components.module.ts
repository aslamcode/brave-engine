import { NgModule } from '@angular/core';
import { CanvasModule } from './canvas/canvas.module';
import { SceneModule } from './scene/scene.module';
import { SettingsModule } from './settings/settings.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [
    CanvasModule,
    SceneModule,
    SettingsModule,
    HeaderModule
  ],
  exports: [
    CanvasModule,
    SceneModule,
    SettingsModule,
    HeaderModule
  ]
})
export class ComponentsModule { }
