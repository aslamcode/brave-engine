import { TemplateRef, ViewContainerRef, Directive, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { TableComponent } from '../table.component';

@Directive({
  selector: '[uiTableRow]',
})
export class TableRowDirective implements AfterContentInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tableComponent: TableComponent,
    private cdr: ChangeDetectorRef
  ) {
    this.tableComponent.valueChanges$.subscribe(() => {
      this.create();
    });
  }

  ngAfterContentInit() {
    this.create();
  }

  private create() {
    this.createHeaderRow();
    this.createBodyRows();
  }

  private createHeaderRow() {
    this.tableComponent.headerColumns.clear();
    this.tableComponent.headerTemplate.viewContainer.clear();

    this.tableComponent.headerTemplate.viewContainer.createEmbeddedView(
      this.templateRef,
      { $implicit: {}, index: undefined, header: true }
    );

    this.cdr.detectChanges();

    this.createHeaderColumns();
  }

  private createHeaderColumns() {
    this.tableComponent.innerColumns?.forEach(columnName => {
      const column = this.tableComponent.headerColumns.get(columnName);
      if (column) {
        column.removeHeaderCell();
        column.createHeaderCell();
        column.removeCell();
      }
    });

    this.cdr.detectChanges();
  }

  private createBodyRows() {
    this.viewContainer.clear();

    this.tableComponent.innerData?.forEach((elem, i) => {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: elem, index: i });
    });

    this.cdr.detectChanges();
  }

}
