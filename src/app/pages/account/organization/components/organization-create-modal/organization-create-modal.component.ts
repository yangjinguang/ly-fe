import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../../../components/profile/profile.service';
import {Account} from '../../../../../services/account-api.service';
import {OrganizationApiService} from '../../../../../services/organization-api.service';
import {Organization} from '../../models/organization';

@Component({
    selector: 'app-organization-create-modal',
    templateUrl: './organization-create-modal.component.html',
    styleUrls: ['./organization-create-modal.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationCreateModalComponent implements OnInit {
    public profile: Account;
    public organizations: Organization[];
    public orgForm: FormGroup;
    @Input('parentOrganization') public parentOrganization;

    constructor(private profileService: ProfileService,
                private organizationApi: OrganizationApiService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.getProfile();
        this.getOrganizations();
        this.orgFormBuild();
    }

    private getProfile() {
        this.profileService.getProfile().subscribe(result => {
            this.profile = result;
            console.log(this.profile);
        });
        this.getOrganizations();
    }

    private getOrganizations() {
        this.organizationApi.list(1, 20).subscribe(result => {
            this.organizations = result.data;
        });
    }

    private orgFormBuild() {
        this.orgForm = this.fb.group({
            parentId: [this.parentOrganization && this.parentOrganization.organizationId, Validators.required],
            name: [null, Validators.required],
            description: [],
            isClass: [false]
        });
    }
}
