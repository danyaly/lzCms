import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';

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
        UserModule
    ],
    providers : []
})
export class SystemModule{}