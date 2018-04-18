import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        const token = localStorage.getItem('token');
        let authReq = req.clone();
        if (token) {
            authReq = req.clone({headers: req.headers.set('Authorization', 'bearer ' + token)});
        }
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}

export const HttpProvider = {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
