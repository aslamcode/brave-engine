import { ButtonModule } from './../button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title.component';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageTitleComponent],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    RouterModule
  ],
  exports: [PageTitleComponent]
})
export class PageTitleModule { }
