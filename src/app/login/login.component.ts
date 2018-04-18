import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public validateForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.formBuild();
    }

    private formBuild() {
        this.validateForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public submitForm() {

    }

}
