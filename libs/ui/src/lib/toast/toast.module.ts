import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { UiToastService } from './toast.service';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    ToastComponent
  ]
})
export class ToastModule {
  static forRoot() {
    return {
      ngModule: ToastModule,
      providers: [UiToastService]
    };
  }
}
