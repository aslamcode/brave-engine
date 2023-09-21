import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseComponent } from './collapse.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [CollapseComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    CollapseComponent
  ]
})
export class CollapseModule { }
