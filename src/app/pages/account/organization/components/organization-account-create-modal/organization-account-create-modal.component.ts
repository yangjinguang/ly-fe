import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-organization-account-create-modal',
    templateUrl: './organization-account-create-modal.component.html',
    styleUrls: ['./organization-account-create-modal.component.scss']
})
export class OrganizationAccountCreateModalComponent implements OnInit {
    public accountForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.accountFormBuild();
    }

    private accountFormBuild() {
        this.accountForm = this.fb.group({
            username: [null, Validators.required],
            name: [],
            email: [null, Validators.email],
            phone: [],
            isAdmin: [false],
        });
    }
}
