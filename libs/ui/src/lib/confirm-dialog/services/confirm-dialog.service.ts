import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiConfirmDialogService {

  open$ = new Subject<{ title: string, text: string }>();
  accept$ = new Subject<void>();
  reject$ = new Subject<void>();

  open(title: string, text: string) {
    this.open$.next({ title, text });

    return new Observable<boolean>(obs => {
      const acceptSubscription = this.accept$.subscribe(() => {
        obs.next(true);
        obs.complete();
        acceptSubscription.unsubscribe();
        rejectSubscription.unsubscribe();
      });

      const rejectSubscription = this.reject$.subscribe(() => {
        obs.next(false);
        obs.complete();
        acceptSubscription.unsubscribe();
        rejectSubscription.unsubscribe();
      });
    });
  }

}
