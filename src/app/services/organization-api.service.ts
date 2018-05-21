import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './models/api-response';
import {Observable} from 'rxjs/Observable';
import {OrganizationListResponse} from './models/organization-list-response';
import {OrganizationResponse} from './models/organization-response';
import {OrganizationAccountListResponse} from './models/organization-account-list-response';
import {AccountListResponse} from './models/account-list-response';

@Injectable()
export class OrganizationApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.organizationApi;
    }

    public list(page: number, size: number): Observable<OrganizationListResponse> {
        return this.http.get(this.baseUrl, {page: page, size: size});
    }

    public get(id: number): Observable<OrganizationResponse> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    public delete(organizationId: string): Observable<ApiResponse> {
        return this.http.delete(`${this.baseUrl}/${organizationId}`);
    }

    public getRoot() {
        return this.http.get(`${this.baseUrl}/root`);
    }

    public getChildren(organizationId: string): Observable<OrganizationListResponse> {
        return this.http.get(`${this.baseUrl}/${organizationId}/children`);
    }

    public tree(): Observable<OrganizationResponse> {
        return this.http.get(`${this.baseUrl}/tree`);
    }

    public create(postData: Object): Observable<OrganizationResponse> {
        return this.http.post(this.baseUrl, postData);
    }

    public update(id: number, postData: Object): Observable<OrganizationResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, postData);
    }

    public accounts(orgId: number, page: number, size: number, deep?: boolean): Observable<AccountListResponse> {
        return this.http.get(`${this.baseUrl}/${orgId}/accounts`, {deep: deep, page: page, size: size});
    }

    public order(ids: number[]): Observable<ApiResponse> {
        return this.http.put(`${this.baseUrl}/order`, {ids: ids});
    }

}
