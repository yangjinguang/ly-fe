import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginApiService} from '../services/login-api.service';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginApiService]
})
export class LoginComponent implements OnInit {
    public validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private loginApi: LoginApiService,
                private token: TokenService,
                private router: Router) {
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
        console.log(this.validateForm.value);
        this.loginApi.login(this.validateForm.value).subscribe(result => {
            this.token.setToken(result.data.token);
            this.router.navigate(['/']);
        });
    }

}
