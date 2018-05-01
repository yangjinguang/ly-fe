import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../../../components/profile/profile.service';
import {OrganizationApiService} from '../../../../../services/organization-api.service';
import {Organization} from '../../models/organization';
import {Account} from '../../models/account';

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
    @Input('parentOrganization') public parentOrganization: Organization;
    @Input('organization') public organization: Organization;

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
        const parentId = this.organization ? this.organization.parentId : this.parentOrganization && this.parentOrganization.organizationId;
        this.orgForm = this.fb.group({
            parentId: [parentId, Validators.required],
            name: [this.organization && this.organization.name, Validators.required],
            description: [this.organization && this.organization.description],
            isClass: [this.organization && this.organization.isClass]
        });
    }
}
