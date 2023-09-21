import { Input, Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: 'ui-select-option'
})
export class SelectOptionDirective {
  @Input() value: any;
  @Input() description!: string | number;
  @Input() selected = false;
  @Input() canSort = true;
  @Input() disabled = false;
  @Input() keyValue = ''; // Used when value is an object
  @Input() fallback = false; // When true show this option when any option not found on filter

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter<any>();
}
