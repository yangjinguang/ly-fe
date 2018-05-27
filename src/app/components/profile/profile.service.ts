import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {ProfileComponent} from './profile.component';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ContactApiService} from '../../services/contact-api.service';
import {Contact} from '../../pages/account/organization/models/contact';

@Injectable()
export class ProfileService {
    private curProfile: Contact;
    private subject: Subject<Contact>;
    private isGetting: boolean;

    constructor(private modalService: NzModalService,
                private contactApi: ContactApiService) {
        this.subject = new Subject<Contact>();
    }

    public view(profile: Contact) {
        const modal = this.modalService.create({
            nzTitle: null,
            nzFooter: null,
            nzClassName: 'card-modal',
            nzMaskStyle: {backgroundColor: 'transparent'},
            nzContent: ProfileComponent,
            nzComponentParams: {
                profile: profile
            }
        });
    }

    public getProfile() {
        if (!this.isGetting) {
            if (this.curProfile) {
                setTimeout(() => {
                    this.subject.next(this.curProfile);
                });
            } else {
                this.isGetting = true;
                this.contactApi.profile().subscribe(result => {
                    this.curProfile = result.data;
                    this.subject.next(this.curProfile);
                    this.isGetting = false;
                });
            }
        }
        return this.subject.asObservable();
    }

    public refreshProfile(): Observable<Contact> {
        return this.contactApi.profile().map(result => {
            this.curProfile = result.data;
            this.subject.next(this.curProfile);
            this.isGetting = false;
            return this.curProfile;
        });
    }
}
