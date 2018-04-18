import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule
    ],
    declarations: [AccountComponent]
})
export class AccountModule {
}
