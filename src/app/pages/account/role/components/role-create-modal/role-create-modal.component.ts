import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../models/role';

@Component({
    selector: 'app-role-create-modal',
    templateUrl: './role-create-modal.component.html',
    styleUrls: ['./role-create-modal.component.scss']
})
export class RoleCreateModalComponent implements OnInit {
    public roleForm: FormGroup;
    @Input('role') public role: Role;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.formBuild();
    }

    private formBuild() {
        this.roleForm = this.fb.group({
            id: [this.role && this.role.id],
            name: [this.role && this.role.name, Validators.required],
            description: [this.role && this.role.description]
        });
    }

}
