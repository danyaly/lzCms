import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetDataService {
    private prefix_url = '/admin.php';

    constructor(private http: Http) {}

    /*使用Get方式传输数据*/
    public getData(url: string) {
        return this.http.get(this.prefix_url + url).toPromise().then(this.handleSuccess).catch(this.handleError);
    }

    /*使用Post方法传输数据*/
    public postData(url: string, data: any, withToken: boolean = true) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        let body: any;
        if (withToken) {
            body = {
                data,
                userid : sessionStorage.getItem('userid'),
                token : sessionStorage.getItem('token')
            };
        }else {
            body = data;
        }
        body = JSON.stringify(body);
        return this.http.post(this.prefix_url + url, body, options).toPromise().then(this.handleSuccess).catch(this.handleError);
    }


    private handleSuccess(response) {
        try {
            const res = response.json();
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
