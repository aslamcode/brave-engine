import { Input, Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'ui-input-option'
})
export class InputOptionDirective {
  @Input() value: any;
  @Input() description!: string | number;
  @Input() canSort = true;
  @Input() fallback = false; // When true show this option when any option not found on filter

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter<any>();
}
