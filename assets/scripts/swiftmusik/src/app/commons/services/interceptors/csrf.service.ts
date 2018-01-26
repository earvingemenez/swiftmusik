import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CsrfService implements HttpInterceptor {
  constructor(private cookieService: CookieService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('csrftoken');
    const dupReq = req.clone({ headers: req.headers.set('X-CSRFToken', token) });
    return next.handle(dupReq);
  }
};
