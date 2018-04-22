import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './api-response';
import {Observable} from 'rxjs/Observable';

export interface Tenant {
    id: number;
    tenantId: string;
    name: string;
    description: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TenantListResponse extends ApiResponse {
    data: Tenant[];
}

@Injectable()
export class TenantApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.tenantApi;
    }

    public listCurrent(): Observable<TenantListResponse> {
        return this.http.get(`${this.baseUrl}/current`);
    }

}
