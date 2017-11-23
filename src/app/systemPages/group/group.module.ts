import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { GroupComponent } from './group';
import { CreateComponent } from './create/create';

@NgModule({
    declarations : [
        GroupComponent,
        CreateComponent
    ],
    exports : [
        GroupComponent
    ],
    entryComponents : [
        CreateComponent
    ],
    imports : [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        NgZorroAntdModule
    ],
    providers : []
})
export class GroupModule{}