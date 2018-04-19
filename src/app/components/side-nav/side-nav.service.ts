import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SideNavService {
    private isCollapsed: boolean;
    private subject: Subject<boolean>;

    constructor() {
        this.subject = new Subject<boolean>();
    }

    public collapsedChange() {
        return this.subject.asObservable();
    }

    public setCollapsed(isCollapsed: boolean) {
        this.isCollapsed = isCollapsed;
        this.subject.next(this.isCollapsed);
    }
}
