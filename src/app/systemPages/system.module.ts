import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { PasswordModule } from './password/password.module';

@NgModule({
    declarations : [
        
    ],
    exports : [
        
    ],
    imports : [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,

        GroupModule,
        UserModule,
        MenuModule,
        PasswordModule
    ],
    providers : []
})
export class SystemModule{}