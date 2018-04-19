import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {NavModule} from '../components/nav/nav.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SideNavModule} from '../components/side-nav/side-nav.module';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        NavModule,
        SideNavModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [PagesComponent]
})
export class PagesModule {
}
