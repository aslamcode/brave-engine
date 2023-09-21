import { Component, OnInit, OnChanges, Output, EventEmitter, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Output() paginatorChange = new EventEmitter<IPaginator>();

  @Input() total = 0;
  @Input() page = 1;
  @Input() pageLength = 25;
  @Input() pageOptions = [25, 50, 100];
  isLastPage = false;
  pages = 0;

  constructor(
    private elementRef: ElementRef
  ) {
    this.update();
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  ngOnChanges() {
    this.update();
  }

  next() {
    if (this.total && this.total !== 0 || !this.isLastPage) {
      this.page++;
      this.update();
      this.changeEvent();
    }
  }

  previous() {
    if (this.page - 1 !== 0) {
      this.page--;
      this.update();
      this.changeEvent();
    }
  }

  goToPage(value: number) {
    if (value != this.page && (value >= 1 || value <= this.pages)) {
      this.page = value;
      this.update();
      this.changeEvent();
    }
  }

  goToFirst() {
    if (this.page !== 1) {
      this.page = 1;
      this.update();
      this.changeEvent();
    }
  }

  goToLast() {
    if (this.total !== 0 && !this.isLastPage) {
      this.page = this.pages;
      this.update();
      this.changeEvent();
    }
  }

  changePageLength(value: number) {
    if (this.total !== 0 && value != this.pageLength) {
      this.pageLength = value;
      this.update();
      this.changeEvent();
    }
  }

  private update() {
    if (this.total && this.total !== 0) {
      // Calculate the pages
      this.pages = Math.ceil((this.total || 0) / this.pageLength);

      // Check is last page
      this.isLastPage = this.page >= this.pages;
    } else {
      this.isLastPage = true;
    }
  }

  private changeEvent() {
    // Send paginator
    this.paginatorChange.emit({
      total: this.total,
      page: this.page,
      pageLength: this.pageLength,
      isLastPage: this.isLastPage
    });
  }

}

export interface IPaginator {
  total: number;
  page: number;
  pageLength: number;
  isLastPage: boolean;
}
