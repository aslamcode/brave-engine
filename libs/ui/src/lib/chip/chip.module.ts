import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { ChipsComponent } from './chips/chips.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    ChipsComponent,
    ChipComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule
  ],
  exports: [
    ChipsComponent,
    ChipComponent
  ]
})
export class ChipModule { }
