import {Component, OnInit} from '@angular/core';
import {OrganizationTreeService} from './services/organization-tree.service';
import {Organization} from './models/organization';
import {NzTreeNode} from 'ng-zorro-antd';
import {XBreadCrumbService} from '../../../components/x-bread-crumb/x-bread-crumb.service';
import {XBreadCrumbItem} from '../../../components/x-bread-crumb/x-bread-crumb-item';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    public orgTree: NzTreeNode[];
    public nodes: NzTreeNode[];
    public bcItems: XBreadCrumbItem[];

    constructor(private orgTreeService: OrganizationTreeService,
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
                text: '组织架构'
            }
        ];
        this.xBreadCrumbService.setItems(this.bcItems);
    }

    private getOrgTree() {
        const organizations = [
            <Organization>{
                id: 1,
                name: 'a',
                children: [
                    {
                        name: 'a-a',
                        id: 11,
                        children: [
                            <Organization>{
                                id: 111,
                                name: 'a-a-a',
                            }
                        ]
                    },
                    {
                        name: 'a-b',
                        id: 12,
                    }
                ]
            },
            <Organization>{
                id: 2,
                name: 'b',
                children: [
                    {
                        name: 'b-a',
                        id: 21,
                    },
                    {
                        name: 'b-b',
                        id: 22,
                    }
                ]
            }
        ];
        this.orgTreeService.setOrgTree(organizations);
    }
}
