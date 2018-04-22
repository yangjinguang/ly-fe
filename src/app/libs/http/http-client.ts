import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class AppHttpClient {

    constructor(private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute,
                private message: NzMessageService) {
    }

    private extractData(res: any) {
        return res || null;
    }

    private paramsParse(data: object): HttpParams {
        let params = new HttpParams();
        if (!data) {
            return params;
        }
        Object.keys(data).forEach(key => {
            if (data[key]) {
                params = params.append(key, data[key]);
            }
        });
        return params;
    }

    private handleError(errResp: HttpErrorResponse | any) {
        let errMsg: any;
        if (errResp instanceof HttpErrorResponse) {
            switch (errResp.status) {
                case 401:
                    console.log(errResp);
                    // handle Unauthorized error and redirect to login page
                    errMsg = '401 Unauthorized';
                    console.log(this.router.url);
                    if (this.router.url !== '/login') {
                        this.router.navigate(['/login']);
                    }
                    break;
                case 403:
                    console.log(errResp);
                    errMsg = '403 Forbidden';
                    console.log();
                    if (errResp.error['code'] === 1) {
                        this.router.navigate(['/login']);
                    } else {
                        this.message.warning('没有权限');
                    }
                    break;
                default:
                    this.message.error('请求错误');
                    break;
            }
        } else {
            errMsg = 'Request Error';
        }
        return Observable.throw(errResp);
    }

    public get(url, search?: object, headers?: HttpHeaders): Observable<any> {
        return this.http.get(url, {params: this.paramsParse(search), headers: headers})
            .map(result => this.extractData(result))
            .catch(error => this.handleError(error));
    }

    public post(url, data: any, search?: object, headers?: HttpHeaders): Observable<any> {
        return this.http.post(url, data, {params: this.paramsParse(search), headers: headers})
            .map(result => this.extractData(result))
            .catch(error => this.handleError(error));
    }

    public put(url, data: any, search?: object, headers?: HttpHeaders): Observable<any> {
        return this.http.put(url, data, {params: this.paramsParse(search), headers: headers})
            .map(result => this.extractData(result))
            .catch(error => this.handleError(error));
    }

    public delete(url, search?: object, headers?: HttpHeaders): Observable<any> {
        return this.http.delete(url, {params: this.paramsParse(search), headers: headers})
            .map(result => this.extractData(result))
            .catch(error => this.handleError(error));
    }
}
