import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeToArrayPipe } from './range-to-array.pipe';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { NumberToMonthPipe } from './number-to-month.pipe';

@NgModule({
  declarations: [
    RangeToArrayPipe,
    EnumToArrayPipe,
    NumberToMonthPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RangeToArrayPipe,
    EnumToArrayPipe,
    NumberToMonthPipe
  ]
})
export class PipesModule { }
