import { Component, Input } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'group.html',
    styleUrls : ['group.scss'],
})
export class GroupComponent {
    @Input() user;

    public groups = [];
    public isLoading = false;

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {}

    ngOnInit(){
        this.user.group = this.user.group ? this.user.group : 0;
        this.getGroup();
    }

    getGroup(){
        this.dataService.getData("/system/GroupCtl/getGroupList").then((res:any) => {
            this.isLoading = false;
            if(res.status == "success"){
                this.groups = res.data;
                this.groups.unshift({
                    id : 0,
                    name : "无"
                })
            }else{
                this._message.error(res.message);
            }
        })
    }

    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    handleSave($event){
        this.isLoading = true;
        this.dataService.postData("/system/UserCtl/editUserGroup",{
            id : this.user.id,
            groupId : this.user.group
        }).then(res => {
            this.isLoading = false;
            if(res.status == "success"){
                this._message.success("配置用户角色成功");
                this.subject.destroy('onOk');
            }else{
                this._message.error(res.msg);
            }
        })
    }

}
