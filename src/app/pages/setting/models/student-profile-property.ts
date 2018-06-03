import {StudentProfilePropertyOption} from './student-profile-property-option';

export interface StudentProfileProperty {
    id: string;
    name: string;
    position: number[];
    size: number[];
    type: string;
    defaultValue?: any;
    options: StudentProfilePropertyOption[];
}
