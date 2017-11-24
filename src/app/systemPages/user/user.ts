import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalService , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../library/getDataService/getDataService';

import { CreateComponent } from './create/create';

@Component({
    templateUrl : 'user.html',
    styleUrls : ['user.scss'],
})
export class UserComponent {
    public data = [];
    public isLoading = false;

    constructor(
        private dataService: GetDataService,
        private modalService: NzModalService,
        private _message: NzMessageService
    ) {
        this.getData();
    }

    /*获取列表数据*/
    getData(){
        this.isLoading = true;
        this.dataService.getData("/system/UserCtl/getUserList").then((res:any) => {
            this.isLoading = false;
            if(res.status == "success"){
                this.data = res.data;
            }else{
                this._message.error(res.message);
            }
        })
    }

    /*删除一个角色*/
    deleteGroup(userId){
        this.modalService.confirm({
            title  : '您是否确认要删除这个用户',
            content: '<b>删除后已绑定该角色的用户将失去所有权限，需重新分配角色</b>',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/UserCtl/deleteUser",{id:userId}).then(res => {
                    if(res.status == "success"){
                        this._message.success("删除角色成功",{nzDuration : 1500});
                        this.getData();
                    }else{
                        this._message.error(res.msg,{nzDuration : 1500});
                    }
                })
            },
            onCancel() {}
        });
    }

    /*显示创建组件*/
    showAdd(){
        const subscription = this.modalService.open({
            title : '新建角色',
            content : CreateComponent,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {
                name: '测试渲染Component'
            }
        });
        subscription.subscribe(result => {
            console.log(result);
        })
    }


    //获取滚动高度
    getScrollStyle(element){
        let style = window.getComputedStyle(element);
        let height = parseInt(style.height);

        return {
            y : height - 110
        }
    }
}