import { HomeComponent } from './home/home';
import { PasswordComponent } from '../myPages/password/password';
import { AuthGuard } from './base/auth-guard';

export let SubRouting = [
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [AuthGuard],
        canActivateChild : [AuthGuard],
        children : [
            {
                /*修改密码页*/
                path : 'password',
                component : PasswordComponent
            }
        ]
    }
];