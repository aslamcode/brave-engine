import { HttpHandler, HttpInterceptor, HttpEvent, HttpClient } from '@angular/common/http';
import { PartialObserver } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpInterceptorHandler } from './class/http-interceptor-handler';

export abstract class AbstractHttpService extends HttpClient {

  constructor(
    protected httpHandler: HttpHandler,
  ) {
    super(httpHandler);
  }

  /**
   * @example ```ts
   *  instanceFactory(handler: HttpHandler) {
   *     return new CustomHttpService(handler, this.dependencia) as this;
   *  }
   *  ```
   */
  abstract instanceFactory(handler: HttpHandler): this;

  useBaseUrl(baseUrl: string, ref = 'baseUrl') {
    if (baseUrl) {
      return this.use((req, next) => next.handle(
        req.clone({
          url: `${this.trimSlash(baseUrl)}/${this.trimSlash(req.url)}`,
        })
      ), ref);
    } else {
      return this;
    }
  }

  use(middleware: HttpInterceptor['intercept'], ref?: string) {
    return this.useInterceptor({
      intercept: middleware,
    }, ref);
  }

  useSideEffect(observer: PartialObserver<HttpEvent<any>>, beforeRequest?: () => void, ref?: string) {
    return this.use((req, next) => {
      if (beforeRequest) { beforeRequest(); }

      return next.handle(req).pipe(
        tap(observer)
      );
    }, ref);
  }

  useInterceptor(interceptor: HttpInterceptor, ref?: string): this {
    const handler: HttpHandler = new HttpInterceptorHandler(this.httpHandler, interceptor, ref);
    const result = this.instanceFactory(handler) as this;
    return result;
  }

  disableInterceptor(ref: string) {
    if (this.httpHandler instanceof HttpInterceptorHandler) {
      const newHandler = this.httpHandler.clone();
      this.httpHandler = newHandler;
      // tslint:disable-next-line: no-string-literal
      this['handler'] = newHandler;
    }

    let handler: HttpHandler | null = this.httpHandler;
    while (handler instanceof HttpHandler) {
      if (handler instanceof HttpInterceptorHandler) {
        if (handler.ref == ref) {
          handler.disable();
        }

        handler = handler.next;
      } else {
        handler = null;
      }
    }

    return this;
  }

  /**
   * @example '/teste/teste/' => teste/teste
   */
  private trimSlash(text: string = '') {
    return text.replace(/^\//, '').replace(/\/$/, '');
  }
}

