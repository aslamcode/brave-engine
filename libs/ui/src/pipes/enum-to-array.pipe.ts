import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: any): { key: string, value: any }[] {
    if (value) {
      const keys = Object.keys(value);

      const items: any[] = [];

      for (const key of keys) {
        items.push({ key, value: value[key] });
      }

      return items;
    } else {
      return value;
    }
  }

}
