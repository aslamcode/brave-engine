import { Injectable } from '@angular/core';
import { isToast, Toast, ToastType } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class UiToastService {

  toasts: Toast[] = [];

  toast(item: Toast | Toast[] | string, type?: ToastType, duration: number = 6000): Toast | Toast[] {
    if (item instanceof Array) {
      return item.map(i => this.toast(i)) as Toast[];
    } else if (isToast(item)) {
      return this.toast(item.description, item.type);
    } else {
      const toast: Toast = { description: item.toString(), type };
      this.toasts.push(toast);
      if (duration > 0) {
        setTimeout(() => {
          this.dismiss(toast);
        }, duration);
      }
      return toast;
    }
  }

  dismiss(item: Toast | Toast[]) {
    if (item instanceof Array) {
      item.forEach(i => this.dismiss(i));
    } else {
      const index = this.toasts.indexOf(item);
      if (index != -1) {
        this.toasts.splice(
          this.toasts.indexOf(item),
          1
        );
      }
    }
  }

}
