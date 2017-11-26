import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserComponent } from './user';
import { CreateComponent } from './create/create';
import { GroupComponent } from './group/group';

@NgModule({
    declarations : [
        UserComponent,
        CreateComponent,
        GroupComponent
    ],
    exports : [
        UserComponent
    ],
    entryComponents : [
        CreateComponent,
        GroupComponent
    ],
    imports : [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        NgZorroAntdModule
    ],
    providers : []
})
export class UserModule{}