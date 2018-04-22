import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginApiService} from '../services/login-api.service';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {Tenant, TenantApiService} from '../services/tenant-api.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {LoginTenantSelectComponent} from './login-tenant-select/login-tenant-select.component';
import {ProfileService} from '../components/profile/profile.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginApiService, TenantApiService]
})
export class LoginComponent implements OnInit {
    public validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private loginApi: LoginApiService,
                private tenantApi: TenantApiService,
                private message: NzMessageService,
                private token: TokenService,
                private profileService: ProfileService,
                private modal: NzModalService,
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
        const successHandle = (tenant: Tenant) => {
            this.token.setTenantId(tenant.tenantId);
            this.profileService.refreshProfile().subscribe(profile => {
                this.router.navigate(['/']);
            });
        };
        this.loginApi.login(this.validateForm.value).subscribe(result => {
            this.token.setToken(result.data.token);
            this.tenantApi.listCurrent().subscribe(tenants => {
                console.log(tenants.data);
                if (tenants.data.length <= 0) {
                    this.message.error('未绑定租户');
                    return;
                }
                if (tenants.data.length <= 1) {
                    successHandle(tenants.data[0]);
                } else {
                    const modal = this.modal.create({
                        nzTitle: '选择公司',
                        nzWidth: '521px',
                        nzContent: LoginTenantSelectComponent,
                        nzComponentParams: {
                            tenants: tenants.data
                        },
                        nzFooter: null
                    });
                    modal.afterClose.subscribe((t: Tenant) => {
                        successHandle(t);
                    });
                }
            });
        }, err => {
            this.message.error('用户名密码错误');
            return;
        });
    }
}
