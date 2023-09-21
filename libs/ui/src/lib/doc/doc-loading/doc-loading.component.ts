import { UiLoadingService } from '@brave/ui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-doc-loading',
  templateUrl: './doc-loading.component.html',
  styleUrls: ['./doc-loading.component.scss'],
})
export class DocLoadingComponent implements OnInit {
  constructor(
    private loadingService: UiLoadingService
  ) { }

  ngOnInit() { }

  showLoading() {
    this.loadingService.show();
  }
}
