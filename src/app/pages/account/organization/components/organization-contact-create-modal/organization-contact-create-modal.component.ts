import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../../models/organization';
import {Account} from '../../models/account';
import {OrganizationApiService} from '../../../../../services/organization-api.service';
import {Contact} from '../../models/contact';

@Component({
    selector: 'app-organization-account-create-modal',
    templateUrl: './organization-contact-create-modal.component.html',
    styleUrls: ['./organization-contact-create-modal.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationContactCreateModalComponent implements OnInit {
    public contactForm: FormGroup;
    public organizations: Organization[];
    @Input('contact') public contact: Contact;
    @Input('organization') public organization: Organization;

    constructor(private fb: FormBuilder,
                private organizationApi: OrganizationApiService) {
    }

    ngOnInit() {
        this.contactFormBuild();
        this.getOrganizations();
    }

    private contactFormBuild() {
        this.contactForm = this.fb.group({
            username: [null, this.contact ? null : Validators.required],
            name: [this.contact && this.contact.name],
            email: [this.contact && this.contact.email, Validators.email],
            phone: [this.contact && this.contact.phone],
            organizationIds: [this.contact && this.contact.organizationIds || [this.organization.organizationId]],
            isAdmin: [this.contact && this.contact.isAdmin ]
        });

    }

    private getOrganizations() {
        this.organizationApi.list(0, 20).subscribe(result => {
            this.organizations = result.data;
        });
    }
}
