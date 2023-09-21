import { Input, Component, ContentChildren, AfterContentInit, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { TableColDirective } from '../directives/table-col.directive';
import { TableComponent } from '../table.component';
import { TableTemplateDirective } from '../directives/table-template.directive';
import { TableRowChildDirective } from '../directives/table-row-child.directive';

@Component({
  selector: 'ui-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements AfterContentInit {

  @Output() childOpenChange = new EventEmitter<boolean>();
  @Input() controlOpenOutside = false;
  @Input() rowId!: string;

  @ContentChildren(TableColDirective) columns!: QueryList<TableColDirective>;

  @ViewChild(TableTemplateDirective, { static: true }) rowTemplate!: TableTemplateDirective;
  @ViewChild('rowChildTemplate', { static: true }) rowChildTemplate!: TableTemplateDirective;

  childDirective!: TableRowChildDirective;

  isChildOpen = false;

  constructor(
    private tableComponent: TableComponent
  ) {
  }

  ngAfterContentInit() {
    this.createColumns();
    if (this.rowId && this.tableComponent.openedRows.has(this.rowId)) {
      this.toggleRow();
    }
  }

  @Input()
  set childOpen(value: boolean) {
    if (this.hasChild && value != this.isChildOpen) {
      value ? this.childDirective.create() : this.childDirective.remove();
      this.isChildOpen = value;
    }
  }

  toggleRow() {
    if (this.hasChild) {
      if (!this.controlOpenOutside) {
        this.isChildOpen ? this.childDirective.remove() : this.childDirective.create();
        this.isChildOpen = !this.isChildOpen;
        this.childOpenChange.emit(this.isChildOpen);

        if (this.isChildOpen) {
          this.tableComponent.openedRows.add(this.rowId);
        } else {
          this.tableComponent.openedRows.delete(this.rowId);
        }
      } else {
        this.childOpenChange.emit(!this.isChildOpen);
      }
    }
  }

  private createColumns() {
    this.tableComponent.innerColumns?.forEach((columnName, i) => {
      const column = this.columns?.find(elem => elem.uiTableCol == columnName);

      if (column) {
        this.rowTemplate?.viewContainer.createEmbeddedView(column.templateRef);

        column.createCell();
        column.cellIndex = i;
      }
    });
  }

  get hasChild() {
    return !!this.childDirective && !this.isHeader;
  }

  get isHeader() {
    return this.columns?.first?.isHeaderCell;
  }
}
