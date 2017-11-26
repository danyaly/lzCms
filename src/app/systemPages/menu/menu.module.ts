import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MenuComponent } from './menu';
import { CreateComponent } from './create/create';
import { EditComponent } from './edit/edit';

@NgModule({
    declarations : [
        MenuComponent,
        CreateComponent,
        EditComponent
    ],
    exports : [
        MenuComponent
    ],
    entryComponents : [
        CreateComponent,
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
export class MenuModule{}