import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from '../../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        const token = this.token.getToken();
        const tenantId = this.token.getTenantId();
        let authReq = req.clone();
        if (token) {
            authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }
        if (tenantId) {
            authReq = authReq.clone({headers: authReq.headers.set('X-TENANT-ID', tenantId)});
        }
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}

export const HttpProvider = {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
