import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToMonth'
})
export class NumberToMonthPipe implements PipeTransform {

  private months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  transform(value: number) {
    if (value != undefined) {
      return this.months[value];
    }
    return value;
  }

}
