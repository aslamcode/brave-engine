import { UiLoadingService } from './loading.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    public loadingService: UiLoadingService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

}
