import {Component, OnInit} from '@angular/core';
import {XTransferItemMap} from '../../../../../components/x-transfer/x-transfer.component';
import {Contact} from '../../../organization/models/contact';
import {ContactApiService} from '../../../../../services/contact-api.service';

@Component({
    selector: 'app-role-members-bind-modal',
    templateUrl: './role-members-bind-modal.component.html',
    styleUrls: ['./role-members-bind-modal.component.scss'],
    providers: [ContactApiService]
})
export class RoleMembersBindModalComponent implements OnInit {
    public usersSource: Contact[];
    public userBindMap: XTransferItemMap;
    public selectedUsers: Contact[];
    private page = 1;
    private size = 10;
    private last: boolean;
    public isUserGetting: boolean;
    private searchText: string;

    constructor(private contactApi: ContactApiService) {
        this.userBindMap = <XTransferItemMap>{
            _xChecked: 'checked',
            _xKey: 'accountId',
            _xValue: 'name'
        };
        this.usersSource = [];
    }

    ngOnInit() {
        this.getAccounts(this.page);
    }

    private getAccounts(page) {
        this.isUserGetting = true;
        this.contactApi.list(page, this.size).subscribe(result => {
            this.usersSource = this.usersSource.concat(result.data.list);
            this.page = result.data.pagination.page;
            this.last = result.data.pagination.last;
            this.isUserGetting = false;
        });
    }

    public loadUsers() {
        if (this.last || this.isUserGetting) {
            return;
        }
        this.getAccounts(this.page + 1);
    }

    public userBindChange(e: Contact[]) {
        this.selectedUsers = e;
        console.log(this.selectedUsers);

    }

    public userSearchChange(e: string) {
        this.page = 1;
        this.usersSource = [];
        this.searchText = e;
    }
}
