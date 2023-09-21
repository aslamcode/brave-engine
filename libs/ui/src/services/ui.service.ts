import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private innerAssetsUrl = '';

  set assetsUrl(value: string) {
    if (value[value.length - 1] === '/') {
      this.innerAssetsUrl = value.slice(0, value.length - 2);
    } else {
      this.innerAssetsUrl = value;
    }
  }

  get assetsUrl() {
    return this.innerAssetsUrl;
  }

}
