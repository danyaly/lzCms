import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { PagesModule } from '../myPages/pages.module';

import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';


@NgModule({
    declarations : [
        LoginComponent,
        HomeComponent
    ],
    exports : [
        LoginComponent,
        HomeComponent
    ],
    imports : [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,

        PagesModule
    ],
    providers : []
})
export class MainModule{}