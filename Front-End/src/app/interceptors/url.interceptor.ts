import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import {  Observable } from "rxjs";
import { environment } from '../../environments/environment';
const apiURL = environment.apiURL;

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/api')) {
      req = req.clone({ url: req.url.replace('/api', apiURL), withCredentials: true })
      console.log(req);
      
    }
    return next.handle(req);
  }

}

export const urlInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true
};