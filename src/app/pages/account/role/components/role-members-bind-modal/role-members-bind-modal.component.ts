import {Component, OnInit} from '@angular/core';
import {Account} from '../../../organization/models/account';
import {XTransferItemMap} from '../../../../../components/x-transfer/x-transfer.component';
import {AccountApiService} from '../../../../../services/account-api.service';

@Component({
    selector: 'app-role-members-bind-modal',
    templateUrl: './role-members-bind-modal.component.html',
    styleUrls: ['./role-members-bind-modal.component.scss'],
    providers: [AccountApiService]
})
export class RoleMembersBindModalComponent implements OnInit {
    public usersSource: Account[];
    public userBindMap: XTransferItemMap;
    public selectedUsers: Account[];
    private page = 1;
    private size = 10;
    private last: boolean;
    public isUserGetting: boolean;
    private searchText: string;

    constructor(private accountApi: AccountApiService) {
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
        this.accountApi.list(page, this.size).subscribe(result => {
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

    public userBindChange(e: Account[]) {
        this.selectedUsers = e;
        console.log(this.selectedUsers);

    }

    public userSearchChange(e: string) {
        this.page = 1;
        this.usersSource = [];
        this.searchText = e;
    }
}
