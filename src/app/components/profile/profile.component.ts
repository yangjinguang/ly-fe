import {Component, OnInit} from '@angular/core';
import {Account} from '../../services/account-api.service';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public profile: Account;

    constructor() {
    }

    ngOnInit() {
    }

}
