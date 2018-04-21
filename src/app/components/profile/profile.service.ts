import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {Account, AccountApiService} from '../../services/account-api.service';
import {ProfileComponent} from './profile.component';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ProfileService {
    private curProfile: Account;
    private subject: Subject<Account>;
    private isGetting: boolean;

    constructor(private modalService: NzModalService,
                private accountApi: AccountApiService) {
        this.subject = new Subject<Account>();
    }

    public view(profile: Account) {
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
                this.accountApi.profile().subscribe(result => {
                    this.curProfile = result.data;
                    this.subject.next(this.curProfile);
                    this.isGetting = false;
                });
            }
        }
        return this.subject.asObservable();
    }

}
