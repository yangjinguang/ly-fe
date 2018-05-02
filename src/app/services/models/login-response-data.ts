import {ApiResponse} from './api-response';

export interface LoginResponseData extends ApiResponse {
    token: string;
    username: string;
}
