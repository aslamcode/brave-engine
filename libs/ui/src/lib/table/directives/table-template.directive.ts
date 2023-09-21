import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[uiTableTemplate]',
  exportAs: 'uiTableTemplate'
})
export class TableTemplateDirective {

  constructor(
    public viewContainer: ViewContainerRef
  ) {
  }

}
