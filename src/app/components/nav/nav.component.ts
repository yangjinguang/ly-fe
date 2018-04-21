import {Component, OnInit} from '@angular/core';
import {Account, AccountApiService} from '../../services/account-api.service';
import {SideNavService} from '../side-nav/side-nav.service';
import {ProfileService} from '../profile/profile.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    providers: [AccountApiService]
})
export class NavComponent implements OnInit {
    public profile: Account;
    public isCollapsed = false;

    constructor(private accountApi: AccountApiService,
                private sideNavService: SideNavService,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        this.getProfile();
    }

    public collapseSideNav() {
        this.isCollapsed = !this.isCollapsed;
        this.sideNavService.setCollapsed(this.isCollapsed);
    }

    private getProfile() {
        this.profileService.getProfile().subscribe(result => {
            this.profile = result;
        });
    }

    public profileView() {
        this.profileService.view(this.profile);
    }

    public logout() {

    }

}
