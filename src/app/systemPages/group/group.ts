import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalService , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../library/getDataService/getDataService';

import { CreateComponent } from './create/create';
import { MenuComponent } from './menu/menu';
import { EditComponent } from './edit/edit';

@Component({
    templateUrl : 'group.html',
    styleUrls : ['group.scss'],
})
export class GroupComponent {
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
        this.dataService.getData("/system/GroupCtl/getGroupList").then((res:any) => {
            this.isLoading = false;
            if(res.status == "success"){
                this.data = res.data;
            }else{
                this._message.error(res.message);
            }
        })
    }

    /*修改一个角色的状态*/
    changeGroupMode(group){
        this.modalService.confirm({
            title  : '您是否确认要' + (group.deleted ? "恢复" : "禁用") + '这个角色吗？',
            content: '',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/GroupCtl/changeGroupMode",{
                    id : group.id,
                    deleted : group.deleted ? 0 : 1
                }).then(res => {
                    if(res.status == "success"){
                        this._message.success( (group.deleted ? "恢复" : "禁用") + "角色成功",{nzDuration : 1500});
                        this.getData();
                    }else{
                        this._message.error(res.msg,{nzDuration : 1500});
                    }
                })
            },
            onCancel() {}
        });
    }

    /*删除一个角色*/
    deleteGroup(groupId){
        this.modalService.confirm({
            title  : '您是否确认要删除这个角色',
            content: '<b>删除后已绑定该角色的用户将失去所有权限，需重新分配角色</b>',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/GroupCtl/deleteGroup",{id:groupId}).then(res => {
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
            componentParams: {}
        });
        subscription.subscribe(result => {
            
        })
    }

    /*显示编辑角色组件*/
    editGroup(group){
        const subscription = this.modalService.open({
            title : '编辑角色',
            content : EditComponent,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {
                group : group
            }
        });
        subscription.subscribe(result => {
            
        })
    }

    /*显示配置权限组件*/
    asignMenu(groupId,menus){
        const subscription = this.modalService.open({
            title : '配置权限',
            content : MenuComponent,
            width : 1000,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {
                groupId : groupId,
                menus : menus
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
