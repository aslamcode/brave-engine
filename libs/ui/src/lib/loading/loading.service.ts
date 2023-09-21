import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This service permit just one loading at a time
 */

// Types
export interface Loading {
  dismiss: () => void;
}

export type LoadingName = 'brave';

@Injectable({
  providedIn: 'root'
})
export class UiLoadingService {

  loading$ = new Subject<string>();
  private loaders = new Set<number>();
  private loadingCount = 0;
  private timeToDisincrease = 60; // Seconds
  private delayToDismiss = 500;
  private hideTimeout: any;

  /**
   * Show a specific loading
   * @param name choose which loading by name
   * @param delay time in seconds
   */
  show(name: LoadingName = 'brave', delay?: number) {
    clearTimeout(this.hideTimeout);
    const id = this.createLoaderId();

    setTimeout(() => {
      this.loading$.next(name);
      this.loadingCount++;
    }, delay);

    // Create timeout limit to cancel the loading
    const timeout = this.disincreaseAfterTime(id);

    this.loaders.add(id);

    // Create the loading to call dismiss
    const loading = new Object() as Loading;
    loading.dismiss = () => {
      clearTimeout(timeout);
      this.hide(id);
    };

    return loading;
  }

  /**
   * Try hide the loading
   */
  private hide(id: number) {
    this.loaders.delete(id);

    if (this.loaders.size === 0) {
      this.hideTimeout = setTimeout(() => {
        this.hideImmediately();
      }, this.delayToDismiss);
    }
  }

  /**
   * Cancel all loadings immediately
   */
  hideImmediately() {
    this.loaders.clear();
    this.loading$.next('');
  }

  /**
   * Set the time to disincrease
   * @param time Receive the time in seconds
   */
  setTimeToDisincrease(time: number) {
    this.timeToDisincrease = time;
  }

  private disincreaseAfterTime(id: number) {
    return setTimeout(() => {
      this.hide(id);
    }, this.timeToDisincrease * 1000);
  }

  private createLoaderId() {
    return ++this.loadingCount;
  }

}
