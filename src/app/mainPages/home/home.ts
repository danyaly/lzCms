import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
    public showSecond = [false, false];

    constructor(private dataService: GetDataService) {
        dataService.postData('/index/index/index',{}).then((res) => {
            console.log(res);
        });
    }

    public showList(num){
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
