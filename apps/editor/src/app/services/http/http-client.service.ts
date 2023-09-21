import { Injectable } from '@angular/core';

import { HttpHandler } from '@angular/common/http';
import { SessionService } from '../session.service';
import { finalize } from 'rxjs/operators';
import { LoadingName, ToastType, UiLoadingService, UiToastService } from '@brave/ui';
import { AbstractHttpService } from '@brave/http';

@Injectable({
  providedIn: 'root',
  deps: [
    HttpHandler,
    SessionService,
    UiLoadingService,
    UiToastService
  ],
  useFactory: (
    httpHandler: HttpHandler,
    sessionService: SessionService,
    uiLoadingService: UiLoadingService,
    uiToastService: UiToastService
  ) => {
    return (new HttpClientService(
      httpHandler,
      sessionService,
      uiLoadingService,
      uiToastService
    ));
  }
})
export class HttpClientService extends AbstractHttpService {

  private constructor(
    httpHandler: HttpHandler,
    private sessionService: SessionService,
    private uiLoadingService: UiLoadingService,
    private uiToastService: UiToastService
  ) {
    super(httpHandler);
  }

  instanceFactory(handler: HttpHandler) {
    return new HttpClientService(
      handler,
      this.sessionService,
      this.uiLoadingService,
      this.uiToastService
    ) as this;
  }

  useToast(ref = 'toast') {
    return this.useSideEffect({
      next: event => {
        // ... Do something when necessary with an ok response
      },
      error: async (data) => {
        console.error('Erro na resposta da api', data);
        if (data?.error.errors) {
          data.errors.forEach((elem: string) => {
            this.uiToastService.toast(elem, ToastType.error);
          });
        } else if (data?.error?.message) {
          this.uiToastService.toast(data.message, ToastType.error);
        } else if (data && data.error instanceof Blob) {
          const obj = await this.blobJsonToObj(data.error);
          this.uiToastService.toast(obj.message, ToastType.error);
        } else {
          this.uiToastService.toast('Aconteceu um erro com a request', ToastType.error);
        }
      }
    }, () => { }, ref);
  }

  useLoading(name?: LoadingName, delay?: number, ref = 'loading') {
    return this.use((req, next) => {
      const loadingRef = this.uiLoadingService.show(name, delay);

      return next.handle(req).pipe(
        finalize(() => loadingRef && loadingRef.dismiss())
      );
    }, ref);
  }

  private blobJsonToObj(blob: Blob) {
    return new Promise<{ message: string; }>((resolve) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const text = e.target.result as string;
        resolve(JSON.parse(text));
      };

      reader.readAsText(blob);
    });
  }
}
