import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SideNavService} from './side-nav.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    public nzMenuItems = {};
    public isCollapsed: boolean;

    constructor(private router: Router,
                private sideNavService: SideNavService) {
    }

    ngOnInit() {
        this.sideNavService.collapsedChange().subscribe(isCollapsed => {
            this.isCollapsed = isCollapsed;
        });
    }

    public isNzOpen(url: string) {
        if (new RegExp(url).test(this.router.url)) {
            this.nzMenuItems[url] = true;
        }
        return this.nzMenuItems[url];
    }
}
