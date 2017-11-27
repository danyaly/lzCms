import { Component } from '@angular/core';
import { trigger,transition,style,animate,state } from '@angular/animations';

import * as md5 from 'md5';
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

    public saveUrl:string = "index/index/changePwd";

    public status:number = 1;

    public dataModel = {
        oldPwd : "",
        newPwd : "",
        reNewPwd : ""
    }

    public statusType(){
        return {
            "btn-info" : this.status == 1,
            "btn-success" : this.status == 2,
            "btn-danger" : this.status == 3
        };
    }

    public errorStatus = {
        oldPwd : false,
        newPwd : false,
        reNewPwd : false
    }
    public errorTip:string = "";

    public saveTip:string = "保存";

    constructor(private dataService: GetDataService) {}

    public myFocus(){
        this.errorTip = "";
        this.errorStatus.oldPwd = false;
        this.errorStatus.newPwd = false;
        this.errorStatus.reNewPwd = false;
    }

    public savePwd(){
        //确认按钮状态
        if(this.status != 1){
            return ;
        }
        //排除空格
        this.dataModel.oldPwd = this.dataModel.oldPwd.replace(/\s+/g,"");
        this.dataModel.newPwd = this.dataModel.newPwd.replace(/\s+/g,""); 
        this.dataModel.reNewPwd = this.dataModel.reNewPwd.replace(/\s+/g,"");
        //校验非空
        if(this.dataModel.oldPwd === ""){
            this.errorStatus.oldPwd = true;
            this.errorTip = "原密码不能为空";
            return ;
        }
        if(this.dataModel.newPwd === ""){
            this.errorStatus.newPwd = true;
            this.errorTip = "新密码不能为空";
            return ;
        }
        if(this.dataModel.reNewPwd === ""){
            this.errorStatus.reNewPwd = true;
            this.errorTip = "重复新密码不能为空";
            return ;
        }

        //校验两个新密码是否相同
        if(this.dataModel.newPwd != this.dataModel.reNewPwd){
            this.errorStatus.newPwd = true;
            this.errorStatus.reNewPwd = true;
            this.errorTip = "两个新密码不相同";
            return ;
        }
        
        var data = {
            oldPwd : md5(this.dataModel.oldPwd),
            newPwd : md5(this.dataModel.newPwd)
        }

        this.dataService.postData(this.saveUrl,data).then((result)=>{
            if(result.status == 0){
                this.status = 2;
                this.saveTip = "修改成功";
            }else{
                if(result.status == 9){
                    this.errorStatus.oldPwd = true;
                    this.errorTip = "原密码错误";
                }
                this.status = 3;
                this.saveTip = "修改失败";
                setTimeout(()=>{this.status = 1;this.saveTip = "保存";},2000);
            }
        })
    }
}
