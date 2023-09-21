import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { SelectModule } from '../select/select.module';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    IconModule,
    ButtonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
