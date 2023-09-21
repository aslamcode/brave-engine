import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  declarations: [
    RadioGroupComponent,
    RadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    RadioGroupComponent,
    RadioComponent
  ]
})
export class RadioModule { }
