import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from './table-row/table-row.component';
import { TableColDirective } from './directives/table-col.directive';
import { TableHeaderCellDirective } from './directives/table-header-cell.directive';
import { TableComponent } from './table.component';
import { TableRowDirective } from './directives/table-row.directive';
import { TableColComponent } from './table-col/table-col.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableTemplateDirective } from './directives/table-template.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { IconModule } from '../icon/icon.module';
import { TableRowChildDirective } from './directives/table-row-child.directive';
import { UiDirectivesModule } from '../../directives/ui-directives.module';

@NgModule({
  declarations: [
    // Components
    TableComponent,
    TableRowComponent,
    TableColComponent,
    TableCellComponent,

    // Directives
    TableRowDirective,
    TableColDirective,
    TableHeaderCellDirective,
    TableTemplateDirective,
    TableCellDirective,
    TableRowChildDirective
  ],
  imports: [
    CommonModule,
    IconModule,
    UiDirectivesModule
  ],
  exports: [
    // Components
    TableComponent,
    TableRowComponent,
    TableColComponent,
    TableCellComponent,

    // Directives
    TableRowDirective,
    TableColDirective,
    TableHeaderCellDirective,
    TableCellDirective,
    TableRowChildDirective
  ]
})
export class TableModule { }
