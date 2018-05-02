import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {AccountProfileResponse} from './models/account-profile-response';
import {AccountListResponse} from './models/account-list-response';
import {AccountResponse} from './models/account-response';
import {AccountStatusEnum} from '../pages/account/organization/models/account-status-enum.enum';

@Injectable()
export class AccountApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.accountApi;
    }

    public profile(): Observable<AccountProfileResponse> {
        return this.http.get(`${this.baseUrl}/profile`);
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

    public detail(id: number): Observable<AccountResponse> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    public changeStatus(id: number, status: AccountStatusEnum): Observable<AccountResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, {status: status});
    }

}
