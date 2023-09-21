import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TableColDirective } from './table-col.directive';

@Directive({
  selector: '[uiTableCell]'
})
export class TableCellDirective {

  constructor(
    public templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tableColDirective: TableColDirective
  ) {
    this.tableColDirective.cell = this;
  }

  create() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  remove() {
    this.viewContainer.clear();
  }

}
