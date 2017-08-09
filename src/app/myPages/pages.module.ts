import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        FormsModule,
        BrowserAnimationsModule
    ],
    providers : []
})
export class PagesModule{}