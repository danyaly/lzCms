import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PasswordComponent } from './password';

@NgModule({
    declarations : [
        PasswordComponent
    ],
    exports : [
        PasswordComponent
    ],
    entryComponents : [

    ],
    imports : [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        NgZorroAntdModule
    ],
    providers : []
})
export class PasswordModule{}