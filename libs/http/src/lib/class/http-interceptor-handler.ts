import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpInterceptorHandler extends HttpHandler {
  enabled = true;

  constructor(
    public next: HttpHandler,
    public interceptor: HttpInterceptor,
    public ref?: string,
  ) {
    super();
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.enabled) {
      return this.interceptor.intercept(req, this.next);
    } else {
      return this.next.handle(req);
    }
  }

  clone(): HttpInterceptorHandler {
    return new HttpInterceptorHandler(
      this.next instanceof HttpInterceptorHandler ? this.next.clone() : this.next,
      this.interceptor,
      this.ref
    );
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}
