import { IconModule } from './../icon/icon.module';
import { UiLoadingService } from './loading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingBraveComponent } from './loading-brave/loading-brave.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingBraveComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule {
  static forRoot() {
    return {
      ngModule: LoadingModule,
      providers: [UiLoadingService]
    };
  }
}

