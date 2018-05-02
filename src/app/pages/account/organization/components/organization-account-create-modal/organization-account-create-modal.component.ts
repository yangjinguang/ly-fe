import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../../models/organization';
import {Account} from '../../models/account';
import {OrganizationApiService} from '../../../../../services/organization-api.service';

@Component({
    selector: 'app-organization-account-create-modal',
    templateUrl: './organization-account-create-modal.component.html',
    styleUrls: ['./organization-account-create-modal.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationAccountCreateModalComponent implements OnInit {
    public accountForm: FormGroup;
    public organizations: Organization[];
    @Input('account') public account: Account;
    @Input('organization') public organization: Organization;

    constructor(private fb: FormBuilder,
                private organizationApi: OrganizationApiService) {
    }

    ngOnInit() {
        this.accountFormBuild();
        this.getOrganizations();
    }

    private accountFormBuild() {
        this.accountForm = this.fb.group({
            username: [this.account && this.account.username, Validators.required],
            name: [this.account && this.account.name],
            email: [this.account && this.account.email, Validators.email],
            phone: [this.account && this.account.phone],
            organizationIds: [this.account && this.account.organizationIds || [this.organization.organizationId]],
            isAdmin: [this.account && this.account.isAdmin || false]
        });

    }

    private getOrganizations() {
        this.organizationApi.list(0, 20).subscribe(result => {
            this.organizations = result.data;
        });
    }
}
