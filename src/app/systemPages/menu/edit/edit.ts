import { Component, Input } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'edit.html',
    styleUrls : ['edit.scss'],
})
export class EditComponent {
    @Input() menu;

    public isLoading = false;
    public error = {
        name_error : "",
        link_error : ""
    }

    public firstLevelList = [];

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {
        this.getFirstLevelList();
    }

    /*获取一级菜单*/
    getFirstLevelList(){
        this.dataService.getData("/system/MenuCtl/getFirstLevelMenu").then((res:any) => {
            if(res.status == "success"){
                this.firstLevelList = res.data;
                this.firstLevelList.unshift({
                    id : 0,
                    name : "设为顶级菜单"
                })
            }else{
                this._message.error(res.msg);
            }
        })
    }

    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    handleSave($event){
        this.menu.name = this.menu.name.replace(/\s+/g,"");
        if(!this.menu.name){
            this.error.name_error = "请填写菜单名";
            return ;
        }
        this.isLoading = true;
        this.dataService.postData("/system/MenuCtl/editMenu",{
            id : this.menu.id,
            name : this.menu.name,
            link : this.menu.link,
            pid : this.menu.pid,
            orders : this.menu.orders,
            icon : this.menu.icon
        }).then(res => {
            this.isLoading = false;
            if(res.status == "success"){
                this._message.success("更新菜单成功");
                this.subject.destroy('onOk');
            }else{
                this._message.error(res.msg);
            }
        })
    }

}
