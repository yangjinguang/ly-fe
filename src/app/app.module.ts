import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AppHttpClient} from './libs/http/http-client';
import {HttpProvider} from './libs/http/http-provider.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TokenService} from './services/token.service';


@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AppHttpClient,
        HttpProvider,
        TokenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
