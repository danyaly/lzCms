import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NzModalSubject , NzMessageService } from 'ng-zorro-antd';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : './home.html',
    styleUrls : ['./home.scss'],
    animations : [
        trigger('secondListTrigger', [
            transition('void => *', [
    			style({height : 0, paddingTop : 0, paddingBottom : 0}),
    			animate('300ms ease-out')
    		]),
            transition('* => void', [
    			animate('100ms ease-out'),
                style({height : 0, paddingTop : 0, paddingBottom : 0})
    		])
        ])
    ]
})
export class HomeComponent{
    public showSecond = [];
    public menus = [];

    constructor(
        private router: Router,
        private dataService: GetDataService,
        private _message: NzMessageService
    ) {
        this.getMenu();
    }

    public getMenu(){
        this.dataService.getData("/system/MenuCtl/getUserMenu").then((res:any) => {
            if(res.status == "success"){
                let data = res.data;

                let result = [];
                for(let i = 0;i<data.length;i++){
                    if(data[i].pid == 0){
                        result.push(data[i]);
                        this.showSecond.push(false);
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
                this.menus = result;

                console.log(this.menus);
            }else{
                this._message.error("获取菜单列表失败");
            }
        })
    }

    public showList(num,link){
        if(link){
            this.router.navigate(['/home' + link]);
            return;
        }
        if (this.showSecond[num]) {
            this.showSecond[num] = false;
        }else {
            this.showSecond.forEach((item, index) => {
                this.showSecond[index] = false;
            });
            this.showSecond[num] = true;
        }
    }
}
