import {Component, OnInit} from '@angular/core';
import {OrganizationTreeService} from './services/organization-tree.service';
import {Organization} from './models/organization';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
import {XBreadCrumbService} from '../../../components/x-bread-crumb/x-bread-crumb.service';
import {XBreadCrumbItem} from '../../../components/x-bread-crumb/x-bread-crumb-item';
import {OrganizationApiService} from '../../../services/organization-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
    providers: [OrganizationApiService]
})
export class OrganizationComponent implements OnInit {
    public bcItems: XBreadCrumbItem[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private xBreadCrumbService: XBreadCrumbService) {
    }

    ngOnInit() {
        this.xBreadCrumbService.itemsChange().subscribe(items => {
            this.bcItems = items;
        });
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
}
