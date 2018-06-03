import {ApiResponse} from './api-response';
import {StudentProfile} from '../../pages/setting/models/student-profile';

export interface StudentProfileResponse extends ApiResponse {
    data: StudentProfile;
}
