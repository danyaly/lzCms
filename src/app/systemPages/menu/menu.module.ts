import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MenuComponent } from './menu';
import { CreateComponent } from './create/create';

@NgModule({
    declarations : [
        MenuComponent,
        CreateComponent
    ],
    exports : [
        MenuComponent
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
export class MenuModule{}