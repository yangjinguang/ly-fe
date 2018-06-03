import {Injectable} from '@angular/core';
import {AppHttpClient} from '../libs/http/http-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {StudentProfileResponse} from './models/student-profile-response';
import {StudentProfile} from '../pages/setting/models/student-profile';

@Injectable()
export class StudentApiService {
    private readonly baseUrl: string;

    constructor(private http: AppHttpClient) {
        this.baseUrl = environment.studentApi;
    }

    public profileTemplate(): Observable<StudentProfileResponse> {
        return this.http.get(`${this.baseUrl}/profile/template`);
    }

    public updateProfileTemplate(id: string, newProfile: StudentProfile): Observable<StudentProfileResponse> {
        return this.http.put(`${this.baseUrl}/profile/template/${id}`, newProfile);
    }
}
