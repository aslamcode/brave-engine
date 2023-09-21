import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
