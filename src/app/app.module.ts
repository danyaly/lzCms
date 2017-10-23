import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { SubRouting } from './mainPages/main.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MainModule } from './mainPages/main.module';

// library
import { GetDataService } from './library/getDataService/getDataService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(Routing),
    RouterModule.forChild(SubRouting),

    MainModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
