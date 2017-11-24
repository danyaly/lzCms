import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'create.html',
    styleUrls : ['create.scss'],
})
export class CreateComponent {

    public group_name = "";
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
        this.group_name = this.group_name.replace(/\s+/g,"");
        if(!this.group_name){
            this.error_tip = "请填写角色名";
            return ;
        }
        this.isLoading = true;
        this.dataService.postData("/system/GroupCtl/addGroup",{name:this.group_name}).then(res => {
            this.isLoading = false;
            if(res.status == "success"){
                this._message.success("创建新角色成功");
                this.subject.destroy('onOk');
            }else{
                this._message.error(res.msg);
            }
        })
    }

}
