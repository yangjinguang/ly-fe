import {Component, OnInit} from '@angular/core';
import {SideNavService} from '../components/side-nav/side-nav.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
    public sideNavCollapsed: boolean;

    constructor(private sideNavService: SideNavService) {
    }

    ngOnInit() {
        this.sideNavService.collapsedChange().subscribe(isCollapsed => {
            this.sideNavCollapsed = isCollapsed;
        });
    }

}
