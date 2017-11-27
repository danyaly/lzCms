import { Component, Input } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'edit.html',
    styleUrls : ['edit.scss'],
})
export class EditComponent {
    @Input() group;

    public data:any = {};
    public error = {
        name : ""
    }
    public isLoading = false;

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {}

    ngOnInit(){
        for(let x in this.group){
            this.data[x] = this.group[x];
        }
    }

    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    handleSave($event){
        this.data.name = this.data.name.replace(/\s+/g,"");
        if(!this.data.name){
            this.error.name = "请填写角色名";
            return ;
        }
        if(JSON.stringify(this.group) == JSON.stringify(this.data)){
            this._message.error("没有数据被更新");
            return ;
        }

        this.isLoading = true;
        this.dataService.postData("/system/GroupCtl/editGroup",{
            id : this.data.id,
            name : this.data.name
        }).then(res => {
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
