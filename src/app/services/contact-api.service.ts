import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ContactStatus} from '../pages/account/organization/enums/contactStatus';
import {ContactListResponse} from './models/contact-list-response';
import {ContactResponse} from './models/contact-response';

@Injectable()
export class ContactApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.contactApi;
    }

    public profile(): Observable<ContactResponse> {
        return this.http.get(`${this.baseUrl}/profile`);
    }

    public list(page: number, size: number): Observable<ContactListResponse> {
        return this.http.get(this.baseUrl, {page: page, size: size});
    }

    public create(postData: object): Observable<ContactResponse> {
        return this.http.post(`${this.baseUrl}`, postData);
    }

    public update(id: number, postData: object): Observable<ContactResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, postData);
    }

    public detail(id: number): Observable<ContactResponse> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    public changeStatus(id: number, status: ContactStatus): Observable<ContactResponse> {
        return this.http.put(`${this.baseUrl}/${id}`, {status: status});
    }

}
