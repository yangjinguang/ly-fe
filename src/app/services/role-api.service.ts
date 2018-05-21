import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {RoleListResponse} from './models/role-list-response';
import {RoleResponse} from './models/role-response';
import {AccountListResponse} from './models/account-list-response';

@Injectable()
export class RoleApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.roleApi;
    }

    public list(page: number, size: number): Observable<RoleListResponse> {
        return this.http.get(`${this.baseUrl}`, {page: page, size: size});
    }

    public create(postData: object): Observable<RoleResponse> {
        return this.http.post(`${this.baseUrl}`, postData);
    }

    public update(id: number, postData: object): Observable<RoleResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, postData);
    }

    public delete(id: number): Observable<RoleResponse> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    public enabledOrDisabled(id: number, enabled: boolean): Observable<RoleResponse> {
        return this.http.put(`${this.baseUrl}/${id}/${enabled}`, {});
    }

    public detail(id: number): Observable<RoleResponse> {
        return this.http.get(`${this.baseUrl}/${id}/detail`);
    }

    public members(roleId: String, page: number, size: number): Observable<AccountListResponse> {
        return this.http.get(`${this.baseUrl}/${roleId}/members`, {page: page, size: size});
    }
}
