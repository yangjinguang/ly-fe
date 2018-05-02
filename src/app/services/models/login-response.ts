import {LoginResponseData} from './login-response-data';
import {ApiResponse} from './api-response';

export interface LoginResponse extends ApiResponse {
    data: LoginResponseData;
}
