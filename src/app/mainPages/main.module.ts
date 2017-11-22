import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { PagesModule } from '../myPages/pages.module';

import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { IndexComponent } from './index/index';

//guard service
import { AuthGuard } from './base/auth-guard';


@NgModule({
    declarations : [
        LoginComponent,
        HomeComponent,
        IndexComponent
    ],
    exports : [
        LoginComponent,
        HomeComponent,
        IndexComponent
    ],
    imports : [
        CommonModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,

        PagesModule
    ],
    providers : [
        AuthGuard
    ]
})
export class MainModule{}