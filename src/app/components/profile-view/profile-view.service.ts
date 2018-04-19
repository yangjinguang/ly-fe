import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {Account} from '../../services/account-api.service';
import {ProfileViewComponent} from './profile-view.component';

@Injectable()
export class ProfileViewService {

    constructor(private modalService: NzModalService) {
    }

    public open(profile: Account) {
        const modal = this.modalService.create({
            nzTitle: null,
            nzFooter: null,
            nzClassName: 'card-modal',
            nzMaskStyle: {backgroundColor: 'transparent'},
            nzContent: ProfileViewComponent,
            nzComponentParams: {
                profile: profile
            }
        });
    }

}
