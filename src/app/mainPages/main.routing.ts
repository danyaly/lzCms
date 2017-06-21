import { HomeComponent } from './home/home';
import { PasswordComponent } from '../myPages/password/password';

export let SubRouting = [
    {
        path : 'home',
        component : HomeComponent,
        children : [
            {
                /*修改密码页*/
                path : 'password',
                component : PasswordComponent
            }
        ]
    }
];