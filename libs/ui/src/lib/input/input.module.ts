import { InputComponent } from './input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { UiDirectivesModule } from '../../directives/ui-directives.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { IconModule } from '../icon/icon.module';
import { InputOptionDirective } from './input-option.directive';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    InputComponent,
    InputOptionDirective
  ],
  imports: [
    CommonModule,
    IconModule,
    CheckboxModule,
    FormsModule,
    ScrollingModule,
    UiDirectivesModule,
    TooltipModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    InputComponent,
    InputOptionDirective
  ],
  providers: [provideNgxMask()]
})
export class InputModule { }
