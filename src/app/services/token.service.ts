import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
    private token: string;
    private tenantId: string;

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

    public setTenantId(tenantId: string): void {
        this.tenantId = tenantId;
        localStorage.setItem('tenantId', tenantId);
    }

    public getTenantId(): string {
        if (this.tenantId) {
            return this.tenantId;
        } else {
            this.tenantId = localStorage.getItem('tenantId');
            return this.tenantId;
        }
    }

    public clear(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tenantId');
    }
}
