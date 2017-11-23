import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : 'group.html',
    styleUrls : ['group.scss'],
})
export class GroupComponent {
    public data = [];

    constructor(private dataService: GetDataService) {
        this.dataService.getData("/system/GroupCtl/getGroupList").then(res => {
            if(res.status == "success"){
                this.data = res.data;
            }else{
                // todo 获取列表失败
            }
        })
    }

}
