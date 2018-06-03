import {StudentProfileProperty} from './student-profile-property';

export interface StudentProfile {
    id: string;
    studentId: string;
    name: string;
    tenantId: string;
    enabled: boolean;
    template: boolean;
    properties: StudentProfileProperty[];
}
