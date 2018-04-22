import {Component, OnInit} from '@angular/core';
import {OrganizationTreeService} from './services/organization-tree.service';
import {Organization} from './models/organization';
import {NzTreeNode} from 'ng-zorro-antd';
import {XBreadCrumbService} from '../../../components/x-bread-crumb/x-bread-crumb.service';
import {XBreadCrumbItem} from '../../../components/x-bread-crumb/x-bread-crumb-item';
import {OrganizationApiService} from '../../../services/organization-api.service';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationComponent implements OnInit {
    public orgTree: NzTreeNode[];
    public nodes: NzTreeNode[];
    public bcItems: XBreadCrumbItem[];

    constructor(private orgTreeService: OrganizationTreeService,
                private organizationApi: OrganizationApiService,
                private xBreadCrumbService: XBreadCrumbService) {
    }

    ngOnInit() {
        this.xBreadCrumbService.itemsChange().subscribe(items => {
            this.bcItems = items;
        });
        this.orgTreeService.orgTreeChanged().subscribe(result => {
            this.orgTree = result;
            console.log(this.orgTree);
        });
        this.getOrgTree();
        this.bcItems = [
            {
                text: '账户管理'
            },
            {
                text: '组织架构'
            }
        ];
        this.xBreadCrumbService.setItems(this.bcItems);
    }

    private getOrgTree() {
        this.organizationApi.tree().subscribe(result => {
            const organizations = result.data.children;
            this.orgTreeService.setOrgTree(organizations);
        });
    }
}
