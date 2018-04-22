import {Component, Input, OnInit} from '@angular/core';
import {Tenant} from '../../services/tenant-api.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
    selector: 'app-login-tenant-select',
    templateUrl: './login-tenant-select.component.html',
    styleUrls: ['./login-tenant-select.component.scss']
})
export class LoginTenantSelectComponent implements OnInit {
    @Input() public tenants: Tenant[];

    constructor(private modalRef: NzModalRef) {
    }

    ngOnInit() {
    }

    public selected(tenant: Tenant) {
        this.modalRef.close(tenant);
    }
}
