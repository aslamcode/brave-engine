import { TemplateRef, ViewContainerRef, Directive, ChangeDetectorRef } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';

@Directive({
  selector: '[uiTableRowChild]',
})
export class TableRowChildDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private rowComponent: TableRowComponent,
    private cdr: ChangeDetectorRef
  ) {
    this.rowComponent.childDirective = this;
  }

  create() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.cdr.detectChanges();
  }

  remove() {
    this.viewContainer.remove();
    this.cdr.detectChanges();
  }

}
