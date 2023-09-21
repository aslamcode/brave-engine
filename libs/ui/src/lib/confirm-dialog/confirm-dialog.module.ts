import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
