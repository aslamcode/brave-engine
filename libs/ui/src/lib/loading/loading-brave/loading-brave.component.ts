import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ui-loading-brave',
  templateUrl: './loading-brave.component.html',
  styleUrls: ['./loading-brave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBraveComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }
}
