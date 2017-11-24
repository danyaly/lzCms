import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'create.html',
    styleUrls : ['create.scss'],
})
export class CreateComponent {

    public user_name = "";
    public isLoading = false;
    public error_tip = "";

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {}

    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    handleSave($event){
        this.user_name = this.user_name.replace(/\s+/g,"");
        if(!this.user_name){
            this.error_tip = "请填写用户名";
            return ;
        }
        this.isLoading = true;
        this.dataService.postData("/system/UserCtl/addUser",{name:this.user_name}).then(res => {
            this.isLoading = false;
            if(res.status == "success"){
                this._message.success("创建新用户成功");
                this.subject.destroy('onOk');
            }else{
                this._message.error(res.msg);
            }
        })
    }

}
