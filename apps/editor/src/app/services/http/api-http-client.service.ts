import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { SessionService } from '../session.service';
import { finalize, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoadingName, ToastType, UiLoadingService, UiToastService } from '@brave/ui';
import { AbstractHttpService } from '@brave/http';
import { Observable, Observer, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
  deps: [
    HttpHandler,
    SessionService,
    UiLoadingService,
    UiToastService,
    AuthService
  ],
  useFactory: (
    httpHandler: HttpHandler,
    sessionService: SessionService,
    uiLoadingService: UiLoadingService,
    uiToastService: UiToastService,
    authService: AuthService,
  ) => {
    return (new ApiHttpClientService(
      httpHandler,
      sessionService,
      uiLoadingService,
      uiToastService,
      authService
    ))
      .useToast()
      .useLoading()
      .useAuth();
  }
})
export class ApiHttpClientService extends AbstractHttpService {

  private constructor(
    httpHandler: HttpHandler,
    private sessionService: SessionService,
    private uiLoadingService: UiLoadingService,
    private uiToastService: UiToastService,
    private authService: AuthService
  ) {
    super(httpHandler);
  }

  instanceFactory(handler: HttpHandler) {
    return new ApiHttpClientService(
      handler,
      this.sessionService,
      this.uiLoadingService,
      this.uiToastService,
      this.authService
    ) as this;
  }

  useAuth(ref = 'auth') {
    return this.use((req, next) => {
      return new Observable<Observable<HttpEvent<any>>>(((obs: Observer<void>) => {
        (async () => {
          if (!this.authService.isAuthenticated()) {
            const res = await this.authService.refreshToken();
            if (!res) {
              obs.error('Não foi possível realizar o refresh do token.');
              obs.complete();
              // window.location.href = `${window.location.origin}/inicio`;
              return;
            }
          }

          obs.next();
          obs.complete();
        })();
      }) as any).pipe(mergeMap(value => {
        const session = this.sessionService.getSession();
        if (session?.accessToken) {
          return next.handle(
            req.clone({
              setHeaders: { Authorization: `Bearer ${session.accessToken}` },
            })
          );
        }

        console.warn('Token não foi adicionado pois usuário esta sem sessão', session);
        return next.handle(req);
      }));
    }, ref);
  }

  useToast(ref = 'toast') {
    return this.useSideEffect({
      next: event => {
        // ... Do something when necessary with an ok response
      },
      error: async (data) => {
        console.error('Erro na resposta da api', data);
        if (data?.error?.errors?.length > 0) {
          data?.error?.errors.forEach((elem: { message: string, property: string }) => {
            this.uiToastService.toast(elem.message, ToastType.error);
          });
        } else if (data?.error?.message) {
          this.uiToastService.toast(data.error.message, ToastType.error);
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
