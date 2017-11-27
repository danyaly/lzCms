import { HomeComponent } from './home/home';
import { IndexComponent } from './index/index';

import { AuthGuard } from './base/auth-guard';

import { SystemRouting } from '../systemPages/system.routing';

export let SubRouting = [
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [AuthGuard],
        canActivateChild : [AuthGuard],
        children : [
            {
                /*首页*/
                path : '',
                component : IndexComponent
            },
            ...SystemRouting
        ]
    }
];