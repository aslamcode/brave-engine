import { CheckboxModule } from './../checkbox/checkbox.module';
import { IconModule } from './../icon/icon.module';
import { SelectOptionDirective } from './select-option.directive';
import { SelectComponent } from './select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UiDirectivesModule } from '../../directives/ui-directives.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    SelectComponent,
    SelectOptionDirective
  ],
  imports: [
    CommonModule,
    IconModule,
    CheckboxModule,
    FormsModule,
    ScrollingModule,
    UiDirectivesModule,
    TooltipModule
  ],
  exports: [
    SelectComponent,
    SelectOptionDirective
  ]
})
export class SelectModule { }
