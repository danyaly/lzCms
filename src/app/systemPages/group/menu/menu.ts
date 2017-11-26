import { Component, Input } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../../library/getDataService/getDataService';

@Component({
    templateUrl : 'menu.html',
    styleUrls : ['menu.scss'],
})
export class MenuComponent {
    @Input() groupId;
    @Input() menus:any;

    public data = [];
    public isLoading = false;
    public saveLoading = false;

    constructor(
        private dataService: GetDataService,
        private subject: NzModalSubject,
        private _message: NzMessageService
    ) {}

    ngOnInit(){
        if(!this.groupId){
            this._message.error("获取角色ID失败");
        }
        this.menus = this.menus ? this.menus.split(",") : [];
        this.getData();
    }

    /*Cancel*/
    handleCancel($event){
        this.subject.destroy('onCancel');
    }

    /*OK*/
    handleSave($event){
        this.saveLoading = true;
        //获取menus
        let menus = [];
        for(let x in this.expandDataCache){
            this.expandDataCache[x].forEach(item => {
                if(item.checked){
                    menus.push(item.id);
                }
            });
        }

        this.dataService.postData("/system/GroupCtl/editGroupMenu",{
            groupId : this.groupId,
            menus : menus.join(",")
        }).then(res => {
            this.saveLoading = false;
            if(res.status == "success"){
                this._message.success("更新角色权限成功");
                this.subject.destroy('onOk');
            }else{
                this._message.error(res.msg);
            }
        })
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
                    //disabled
                    data[i].disabled = false;

                    //获取是否check
                    if(this.menus.indexOf(data[i].id.toString()) >= 0){
                        data[i].checked = true;
                    }else{
                        data[i].checked = false;
                    }

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
