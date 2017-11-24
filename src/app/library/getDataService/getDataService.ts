import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetDataService {
    private prefix_url = '/admin.php';

    constructor(
        private http: Http,
        private _notification: NzNotificationService,
        private router: Router
    ) {}

    /*使用Get方式传输数据*/
    public getData(url: string) {
        const headers = new Headers({ 'token' : sessionStorage.getItem('token') });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.prefix_url + url , options).toPromise().then(this.handleSuccess.bind(this))
            .catch(this.handleError.bind(this));
    }

    /*使用Post方法传输数据*/
    public postData(url: string, data: any, withToken: boolean = true):any {
        const headers = new Headers({ 'token' : sessionStorage.getItem('token') });
        const options = new RequestOptions({ headers: headers });

        let body = JSON.stringify(data);
        return this.http.post(this.prefix_url + url, body, options).toPromise().then(this.handleSuccess.bind(this))
            .catch(this.handleError.bind(this));
    }


    private handleSuccess(response) {
        try {
            const res = response.json();
            if(res.status == "tokenError"){
                this._notification.error(res.message,'',{nzDuration: 1000});
                setTimeout(()=>{
                    this.router.navigate(['/']);
                },1000);
            }
            return res;
        }catch (error) {
            console.log(response);
            return {};
        }
    }

    private handleError(error: any): Promise<any> {
        this._notification.error("后台发生错误，请联系管理员",'错误码：' + error.status,{nzDuration: 4000});
        return Promise.reject(error.message || error);
    }
}
