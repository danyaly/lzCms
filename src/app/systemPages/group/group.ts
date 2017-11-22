import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';

import { GetDataService } from '../../library/getDataService/getDataService';

@Component({
    templateUrl : 'group.html',
    styleUrls : ['group.scss'],
})
export class GroupComponent {
    constructor(private dataService: GetDataService) {}
}
