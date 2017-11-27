import { Component, Input } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'edit.html',
    styleUrls : ['edit.scss'],
})
export class EditComponent {
    @Input() user;

    public data:any = {};
    public isLoading = false;
    public error = {
        name : ""
    }

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {}

    ngOnInit(){
        for(let x in this.user){
            this.data[x] = this.user[x];
        }
    }

    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    handleSave($event){
        this.data.name = this.data.name.replace(/\s+/g,"");
        if(!this.data.name){
            this.error.name = "请填写用户名";
            return ;
        }
        if(JSON.stringify(this.user) == JSON.stringify(this.data)){
            this._message.error("没有数据被更新");
            return ;
        }

        this.isLoading = true;
        this.dataService.postData("/system/UserCtl/editUser",{
            id : this.data.id,
            name : this.data.name
        }).then(res => {
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
