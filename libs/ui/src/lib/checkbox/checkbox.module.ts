import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconModule } from '../icon/icon.module';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    CheckboxGroupComponent
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    CheckboxComponent,
    CheckboxGroupComponent
  ]
})
export class CheckboxModule { }
