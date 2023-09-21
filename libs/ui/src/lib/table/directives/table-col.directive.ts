import { Directive, Input, AfterContentInit, TemplateRef } from '@angular/core';
import { TableComponent } from '../table.component';
import { TableHeaderCellDirective } from './table-header-cell.directive';
import { TableCellDirective } from './table-cell.directive';

@Directive({
  selector: '[uiTableCol]'
})
export class TableColDirective implements AfterContentInit {

  @Input() uiTableCol!: string;

  headerCell!: TableHeaderCellDirective;
  cell!: TableCellDirective;
  isHeaderCell = false;
  cellIndex!: number;

  constructor(
    public templateRef: TemplateRef<any>,
    private tableComponent: TableComponent
  ) {
  }

  ngAfterContentInit() {
    this.tableComponent.registerHeaderColumn(this.uiTableCol, this);
  }

  createHeaderCell() {
    this.isHeaderCell = true;
    this.headerCell.create();
  }

  removeHeaderCell() {
    this.headerCell.remove();
  }

  createCell() {
    this.cell.create();
  }

  removeCell() {
    this.cell.remove();
  }

  get isFirstCol() {
    return this.cellIndex == 0;
  }

  get isLastCol() {
    return this.cellIndex == (this.tableComponent?.innerColumns?.length || 0) - 1;
  }

}
