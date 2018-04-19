import {Component, OnInit} from '@angular/core';
import {XBreadCrumbService} from '../../../../components/x-bread-crumb/x-bread-crumb.service';

@Component({
    selector: 'app-organization-create',
    templateUrl: './organization-create.component.html',
    styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent implements OnInit {

    constructor(private xBreadCrumbService: XBreadCrumbService) {
    }

    ngOnInit() {
        const bcItems = [
            {
                text: '组织架构'
            },
            {
                text: '列表',
                link: '../'
            },
            {
                text: '创建'
            }
        ];
        this.xBreadCrumbService.setItems(bcItems);
    }

}
