import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeToArray'
})
export class RangeToArrayPipe implements PipeTransform {

  transform(start: number, end: number) {
    if (start != undefined && end != undefined) {
      const array: number[] = [];
      for (let i = start; i <= end; i++) {
        array.push(i);
      }

      return array;
    }

    return [];
  }

}
