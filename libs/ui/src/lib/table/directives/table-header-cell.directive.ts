import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TableColDirective } from './table-col.directive';

@Directive({
  selector: '[uiTableHeaderCell]',
})
export class TableHeaderCellDirective {

  constructor(
    public templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tableColDirective: TableColDirective
  ) {
    this.tableColDirective.headerCell = this;
  }

  create() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  remove() {
    this.viewContainer.clear();
  }

}
