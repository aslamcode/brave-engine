import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[readonly]'
})
export class ReadOnlyDirective {
  @Input() readonly = false;
}
