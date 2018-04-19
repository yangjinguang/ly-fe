import {Component, OnInit} from '@angular/core';
import {Account} from '../../services/account-api.service';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
    public profile: Account;

    constructor() {
    }

    ngOnInit() {
    }

}
