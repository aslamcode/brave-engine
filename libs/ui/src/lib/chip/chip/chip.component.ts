import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ui-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnInit {

  @Output() remove = new EventEmitter<void>();

  @Input() hasRemoveBtn = true;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.className = `brave-ui ${this.elementRef.nativeElement.className}`;
  }

  removeBtn() {
    this.remove.emit();
  }
}
