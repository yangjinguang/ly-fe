import {Component, OnInit} from '@angular/core';
import {XBreadCrumbService} from '../../../../components/x-bread-crumb/x-bread-crumb.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../../components/profile/profile.service';
import {Account} from '../../../../services/account-api.service';
import {OrganizationApiService} from '../../../../services/organization-api.service';
import {Organization} from '../models/organization';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-organization-create',
    templateUrl: './organization-create.component.html',
    styleUrls: ['./organization-create.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationCreateComponent implements OnInit {
    public orgForm: FormGroup;
    public profile: Account;
    public organizations: Organization[];

    constructor(private xBreadCrumbService: XBreadCrumbService,
                private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private organizationApi: OrganizationApiService,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        const bcItems = [
            {
                text: '账户管理'
            },
            {
                text: '组织架构',
                link: '../'
            },
            {
                text: '创建'
            }
        ];
        this.xBreadCrumbService.setItems(bcItems);
        this.orgFormBuild();
        this.getProfile();
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
            parentId: [null, Validators.required],
            name: [null, Validators.required],
            description: [],
            isClass: [false]
        });
    }

    public save() {
        const postData = {
            parentId: this.orgForm.get('parentId').value,
            name: this.orgForm.get('name').value,
            description: this.orgForm.get('description').value,
            isClass: this.orgForm.get('isClass').value
        };
        this.organizationApi.create(postData).subscribe(result => {
            console.log(result);
            this.router.navigate(['../'], {relativeTo: this.route});
        });
    }

}
