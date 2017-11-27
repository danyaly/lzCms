import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService , NzMessageService } from 'ng-zorro-antd';
import * as md5 from 'md5';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : './login.html',
    styleUrls : ['./login.scss']
})
export class LoginComponent {
    public user_name = '';
    public password = '';

    constructor(
        private dataService: GetDataService,
        private router: Router,
        private _message: NzMessageService
    ) {}

    public SignIn() {
        const data = {
            name : this.user_name,
            password : md5(this.password)
        };
        let _id = this._message.loading("正在登录，请稍等...").messageId;
        this.dataService.postData('/index/index/login', data, false).then(res => {
            if (res.status === "success") {
                this._message.remove(_id);
                this._message.success("登录成功",{nzDuration : 500});
                setTimeout(()=>{
                    this.router.navigate(['/home']);
                },500);
                sessionStorage.setItem('token', res.data.token);
            }else {
                this._message.remove(_id);
                this._message.error(res.msg);
            }
        });
    }
}
