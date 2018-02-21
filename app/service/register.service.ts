import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {
    private apiURL = "http://5a572260751d4e001277964d.mockapi.io/act/user";

    constructor (private _http: Http) {

    }
    Add(data: any): Observable<any>{
        return this._http.post(this.apiURL,data).map((response: Response) => response.json())
    }
}
