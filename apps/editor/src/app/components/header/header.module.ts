import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@brave/ui';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
