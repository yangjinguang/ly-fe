import {Component, OnInit} from '@angular/core';
import {XBreadCrumbService} from '../../../../components/x-bread-crumb/x-bread-crumb.service';

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

    constructor(private xBreadCrumbService: XBreadCrumbService) {
    }

    ngOnInit() {
        const bcItems = [
            {
                text: '组织架构'
            },
            {
                text: '列表'
            }
        ];
        this.xBreadCrumbService.setItems(bcItems);
    }

}
