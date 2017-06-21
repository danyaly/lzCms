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
    public postData(url: string, data: any){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify(data);
        return this.http.post(this.prefix_url + url, body, options).toPromise().then(this.handleSuccess).catch(this.handleError);
    }


    private handleSuccess(response) {
        console.log(response);
        return response.json();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
