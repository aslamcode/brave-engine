import { Component, Input, HostListener } from '@angular/core';
import { TableComponent } from '../table.component';
import { TableColDirective } from '../directives/table-col.directive';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'ui-table-col',
  templateUrl: './table-col.component.html',
  styleUrls: ['./table-col.component.scss']
})
export class TableColComponent {

  @Input() sort!: string;

  direction!: number;
  isMouseOver!: boolean;

  constructor(
    private tableComponent: TableComponent,
    public colDirective: TableColDirective,
    public rowComponent: TableRowComponent
  ) {
  }

  @HostListener('click')
  toggle() {
    if (this.sort && this.colDirective.isHeaderCell) {
      if (!this.direction) {
        this.direction = 1;
        this.tableComponent.setSortPropertieAscending(this.sort);
      } else if (this.direction == 1) {
        this.direction = -1;
        this.tableComponent.setSortPropertieDescending(this.sort);
      } else {
        this.direction = 0;
        this.tableComponent.removeSortPropertie(this.sort);
      }
    }
  }

  mouseenter() {
    this.isMouseOver = true;
  }

  mouseleave() {
    this.isMouseOver = false;
  }

  get canShowChildIcon() {
    const colIndexToShowIcon = this.tableComponent.childIconColIndex != undefined ? this.tableComponent.childIconColIndex : 0;

    if (colIndexToShowIcon === this.colDirective.cellIndex) {
      return true;
    }
    return false;
  }

  get canShowChildIconInLeft() {
    return this.tableComponent.canShowChildIcon &&
      this.canShowChildIcon &&
      !this.tableComponent.showChildIconInRight &&
      !this.colDirective.isHeaderCell &&
      this.rowComponent.hasChild;
  }

  get canShowChildIconInRight() {
    return this.tableComponent.canShowChildIcon &&
      this.canShowChildIcon &&
      this.tableComponent.showChildIconInRight &&
      !this.colDirective.isHeaderCell &&
      this.rowComponent.hasChild;
  }

  get isChildOpen() {
    return this.rowComponent.isChildOpen;
  }

}
