import { Component, Input, ViewChild, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { TableTemplateDirective } from './directives/table-template.directive';
import { TableColDirective } from './directives/table-col.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  innerData?: any[];
  innerColumns?: string[];

  @Input() canShowChildIcon = true;
  @Input() showChildIconInRight = false;
  @Input() childIconColIndex?: number;

  @Output() sortChange = new EventEmitter<ITableSortEvent>();

  headerColumns = new Map<string, TableColDirective>();

  private sortProperties = new Map<string, number>();

  openedRows = new Set<any>();

  @ViewChild(TableTemplateDirective, { static: true }) headerTemplate!: TableTemplateDirective;

  valueChanges$ = new Subject<any>();

  @Input()
  set data(value: any[] | undefined) {
    this.innerData = value;
    this.valueChanges$.next(undefined);
  }

  @Input()
  set columns(value: string[]) {
    this.innerColumns = value;
    this.valueChanges$.next(undefined);
  }

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  registerHeaderColumn(columnName: string, col: TableColDirective) {
    if (!this.headerColumns.has(columnName)) {
      this.headerColumns.set(columnName, col);
    }
  }

  //#region Sort methods
  setSortPropertieAscending(prop: string) {
    this.sortProperties.set(prop, 1);
    this.updateSortValue();
  }

  setSortPropertieDescending(prop: string) {
    this.sortProperties.set(prop, -1);
    this.updateSortValue();
  }

  removeSortPropertie(prop: string) {
    this.sortProperties.delete(prop);
    this.updateSortValue();
  }

  updateSortValue() {
    // ATTENTION
    // This code bellow is necessary on this way !!!
    // tslint:disable-next-line: no-string-literal
    this.sortChange.emit((Object as any)['fromEntries'](this.sortProperties));
  }

  //#endregion

}

export interface ITableSortEvent {
  [x: string]: 1 | -1;
}
