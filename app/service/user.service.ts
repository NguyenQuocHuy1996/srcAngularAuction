import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private apiURL = "http://5a572260751d4e001277964d.mockapi.io/act/user";

    constructor (private _http: Http) {

    }
    getList(): Observable<any[]>{
        return this._http.get(this.apiURL).map((response: Response) => response.json())
    }

    getOneUser(userName: any){
      return this._http.get(this.apiURL)
        .map(res => {
          return res.json().filter((user) => user.email === userName);
      })
    }
}
