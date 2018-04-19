import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {ApiResponse} from './api-response';
import {Observable} from 'rxjs/Observable';

export interface LoginResponseData {
    token: string;
    username: string;
}

export interface LoginResponse extends ApiResponse {
    data: LoginResponseData;
}

@Injectable()
export class LoginApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.loginApi;
    }

    public login(data: object): Observable<LoginResponse> {
        return this.http.post(this.baseUrl, data);
    }
}
