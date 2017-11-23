import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as md5 from 'md5';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : './login.html',
    styleUrls : ['./login.scss']
})
export class LoginComponent {
    public user_name = '';
    public password = '';

    constructor(private dataService: GetDataService, private router: Router) {}

    public SignIn() {
        const data = {
            name : this.user_name,
            password : md5(this.password)
        };
        this.dataService.postData('/index/index/login', data, false).then(res => {
            if (res.status === 0) {
                sessionStorage.setItem('token', res.data.token);
                this.router.navigate(['/home']);
            }else {
                alert('用户名或密码错');
            }
        });
    }
}
