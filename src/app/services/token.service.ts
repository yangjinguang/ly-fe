import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
    private token: string;

    constructor() {
    }

    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    public getToken(): string {
        if (this.token) {
            return this.token;
        } else {
            this.token = localStorage.getItem('token');
            return this.token;
        }
    }
}
