import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
