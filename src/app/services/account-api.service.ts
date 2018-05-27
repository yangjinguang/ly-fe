import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {AccountListResponse} from './models/account-list-response';
import {AccountResponse} from './models/account-response';

@Injectable()
export class AccountApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.accountApi;
    }

    public list(page: number, size: number): Observable<AccountListResponse> {
        return this.http.get(this.baseUrl, {page: page, size: size});
    }

    public create(postData: object): Observable<AccountResponse> {
        return this.http.post(`${this.baseUrl}`, postData);
    }

    public update(id: number, postData: object): Observable<AccountResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, postData);
    }
}
