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
        return this.http.get(this.prefix_url + url , options).toPromise().then(this.handleSuccess).catch(this.handleError);
    }

    /*使用Post方法传输数据*/
    public postData(url: string, data: any, withToken: boolean = true) {
        const headers = new Headers({ 'token' : sessionStorage.getItem('token') });
        const options = new RequestOptions({ headers: headers });

        let body = JSON.stringify(data);
        return this.http.post(this.prefix_url + url, body, options).toPromise().then(this.handleSuccess.bind(this)).catch(this.handleError);
    }


    private handleSuccess(response) {
        try {
            const res = response.json();
            if(res.status == "tokenError"){
                this._notification.create('error', res.message,'',{
                    nzDuration : 1.5
                });
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
        console.error('An error occurred', error._body); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
