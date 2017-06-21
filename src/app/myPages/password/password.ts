import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : 'password.html',
    styleUrls : ['password.scss'],
    animations : [
        trigger('containerTrigger', [
            transition('void => *', [
    			style({transform: 'scale(0)'}),
    			animate('300ms ease-out')
    		])
        ])
    ]
})
export class PasswordComponent {
    constructor(private dataService: GetDataService) {
        console.log(dataService.getData('/Index/index/index'));
    }
}
