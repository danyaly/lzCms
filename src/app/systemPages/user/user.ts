import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalService , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../library/getDataService/getDataService';

import { CreateComponent } from './create/create';
import { GroupComponent } from './group/group';
import { EditComponent } from './edit/edit';

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

    /*改变一个角色的状态*/
    changeUserMode(user){
        this.modalService.confirm({
            title  : '您是否确认要' + (user.deleted ? "恢复" : "禁用") + '这个用户吗？',
            content: '',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/UserCtl/changeUserMode",{
                    id : user.id,
                    deleted : user.deleted ? 0 : 1
                }).then(res => {
                    if(res.status == "success"){
                        this._message.success( (user.deleted ? "恢复" : "禁用") + "用户成功",{nzDuration : 1500});
                        this.getData();
                    }else{
                        this._message.error(res.msg,{nzDuration : 1500});
                    }
                })
            },
            onCancel() {}
        });
    }

    /*删除一个用户*/
    deleteUser(userId){
        this.modalService.confirm({
            title  : '您是否确认要删除这个用户',
            content: '<b>此功能将永久删除该用户，请谨慎操作</b>',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/UserCtl/deleteUser",{id:userId}).then(res => {
                    if(res.status == "success"){
                        this._message.success("删除用户成功",{nzDuration : 1500});
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
            title : '新建用户',
            content : CreateComponent,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {}
        });
        subscription.subscribe(result => {
            
        })
    }

    /*显示配置角色组件*/
    editGroup(item){
        const subscription = this.modalService.open({
            title : '分配角色',
            content : GroupComponent,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {
                user : item
            }
        });
        subscription.subscribe(result => {
            
        })
    }

    /*显示编辑角色组件*/
    editUser(item){
        const subscription = this.modalService.open({
            title : '编辑用户',
            content : EditComponent,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {
                user : item
            }
        });
        subscription.subscribe(result => {
            
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
