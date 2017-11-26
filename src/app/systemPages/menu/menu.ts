import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalService , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../library/getDataService/getDataService';

import { CreateComponent } from './create/create';

@Component({
    templateUrl : 'menu.html',
    styleUrls : ['menu.scss'],
})
export class MenuComponent {
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
        this.dataService.getData("/system/MenuCtl/getMenuList").then((res:any) => {
            this.isLoading = false;
            if(res.status == "success"){
                let data = res.data;
                let result = [];
                for(let i = 0;i<data.length;i++){
                    if(data[i].pid == 0){
                        result.push(data[i]);
                    }
                }
                for(let i = 0;i<result.length;i++){
                    for(let j = 0;j<data.length;j++){
                        if(data[j].pid == result[i].id){
                            if(!result[i]['children']) result[i]['children'] = [];
                            result[i]['children'].push(data[j]);
                        }
                    }
                }
                this.data = result;
                this.data.forEach(item => {
                    this.expandDataCache[ item.id ] = this.convertTreeToList(item);
                });
            }else{
                this._message.error(res.message);
            }
        })
    }

    /*删除一个菜单*/
    deleteMenu(menuId){
        this.modalService.confirm({
            title  : '您是否确认要删除这个菜单',
            content: '注意：子菜单也会一并删除',
            showConfirmLoading: true,
            onOk: ()=>{
                this.dataService.postData("/system/MenuCtl/deleteMenu",{id:menuId}).then(res => {
                    if(res.status == "success"){
                        this._message.success("删除菜单成功",{nzDuration : 1500});
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
            title : '新建菜单',
            content : CreateComponent,
            width : 600,
            onOk : () => {
                this.getData();
            },
            footer : false,
            componentParams: {}
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


    /*****树方法*****/
    expandDataCache = {};
    collapse(array, data, $event) {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }
    convertTreeToList(root) {
        const stack = [], array = [], hashMap = {};
        stack.push({ ...root, level: 0, expand: false });
    
        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
                }
            }
        }
        return array;
    }
    visitNode(node, hashMap, array) {
        if (!hashMap[ node.id ]) {
            hashMap[ node.id ] = true;
            array.push(node);
        }
    }
}
