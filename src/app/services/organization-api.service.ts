import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './api-response';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../pages/account/organization/models/organization';
import {OrganizationTree} from '../pages/account/organization/models/organization-tree';
import {Account} from './account-api.service';

export interface OrganizationListResponse extends ApiResponse {
    data: Organization[];
}

export interface OrganizationAccountListResponse extends ApiResponse {
    data: Account[];
}

export interface OrganizationResponse extends ApiResponse {
    data: Organization;
}

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

    public getRoot(): Observable<OrganizationResponse> {
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

    public accounts(orgId: number, deep?: boolean): Observable<OrganizationAccountListResponse> {
        return this.http.get(`${this.baseUrl}/${orgId}/accounts`, {deep: deep});
    }

}
