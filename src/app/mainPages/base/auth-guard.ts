import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard{

    constructor(public router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        var result : boolean = this.checkLogin();
        if(!result){
            this.router.navigate(['']);
        }
        return result;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        var result : boolean = this.checkLogin();
        if(!result){
            this.router.navigate(['']);
        }
        return result;
    }

    checkLogin(){
        return sessionStorage.getItem("token") ? true : false;
    }
}