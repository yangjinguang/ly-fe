import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './api-response';
import {Observable} from 'rxjs/Observable';

export interface Account {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    wxOpenId: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
    organizationId: number;
    roleId: number;
}

export interface AccountResponse extends ApiResponse {
    data: Account[];
}

export interface AccountProfileResponse extends ApiResponse {
    data: Account;
}

@Injectable()
export class AccountApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.accountApi;
    }

    public profile(): Observable<AccountProfileResponse> {
        return this.http.get(`${this.baseUrl}/profile`);
    }

    public list(page: number, size: number): Observable<AccountResponse> {
        return this.http.get(this.baseUrl, {page: page, size: size});
    }

}
