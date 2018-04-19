import {Component, Input, OnInit} from '@angular/core';
import {XBreadCrumbItem} from './x-bread-crumb-item';

@Component({
    selector: 'app-x-bread-crumb',
    templateUrl: './x-bread-crumb.component.html',
    styleUrls: ['./x-bread-crumb.component.scss']
})
export class XBreadCrumbComponent implements OnInit {
    @Input('items') items: XBreadCrumbItem[];

    constructor() {
    }

    ngOnInit() {
    }

}
