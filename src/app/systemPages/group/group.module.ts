import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { GroupComponent } from './group';
import { CreateComponent } from './create/create';
import { MenuComponent } from './menu/menu';
import { EditComponent } from './edit/edit';

@NgModule({
    declarations : [
        GroupComponent,
        CreateComponent,
        MenuComponent,
        EditComponent
    ],
    exports : [
        GroupComponent
    ],
    entryComponents : [
        CreateComponent,
        MenuComponent,
        EditComponent
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