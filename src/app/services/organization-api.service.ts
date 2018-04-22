import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './api-response';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../pages/account/organization/models/organization';

export interface OrganizationListResponse extends ApiResponse {
    data: Organization[];
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

    public create(postData: Object): Observable<OrganizationResponse> {
        return this.http.post(this.baseUrl, postData);
    }

}
