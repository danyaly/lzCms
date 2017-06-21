import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordComponent } from './password/password';

@NgModule({
    declarations : [
        PasswordComponent
    ],
    exports : [
        PasswordComponent
    ],
    imports : [
        CommonModule,
        BrowserAnimationsModule
    ],
    providers : []
})
export class PagesModule{}