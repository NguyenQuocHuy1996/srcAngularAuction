import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private apiURL = "http://5a572260751d4e001277964d.mockapi.io/act/product";

    now: any ;
    //Month - 1 = current month
    // its mean event date is 2018/02/22
    eventDate: any ;
    currentTiime: any ;
    eventTime: any ;
    remTime: any ;
    s: any ;
    m: any ;
    h: any ;
    d: any ;

    constructor (private _http: Http) {

    }

    countdown(year: number, month: number, day: number){
      this.now = new Date();
      this.eventDate = new Date(year, month , day);
      this.currentTiime = this.now.getTime();
      this.eventTime = this.eventDate.getTime();
      this.remTime = this.eventTime - this.currentTiime;

      if(this.remTime <= 0) {
        document.getElementById('countdownContainer').style.display = 'none';
        document.getElementById('greetingMsg').style.display = '';
        return;
      }

      this.s = Math.floor(this.remTime / 1000);
      this.m = Math.floor(this.s / 60);
      this.h = Math.floor(this.m / 60);
      this.d = Math.floor(this.h / 24);

      this.h %= 24;
      this.m %= 60;
      this.s %= 60;

      this.h = (this.h < 10) ? '0' + this.h : this.h;
      this.m = (this.m < 10) ? '0' + this.m : this.m;
      this.s = (this.s < 10) ? '0' + this.s : this.s;

      document.getElementById('days').textContent = this.d;
      document.getElementById('days').innerText = this.d;

      document.getElementById('hours').textContent = this.h;
      document.getElementById('minutes').textContent = this.m;
      document.getElementById('seconds').textContent = this.s;

      setTimeout(() => this.countdown(year, month, day), 1000);
    }

    getList(): Observable<any[]> {
        return this._http.get(this.apiURL)
          .map((response: Response) => response.json() )
    }

    //Get product by id Category
    getProductbyID(id: number){
      return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((product) => product.cateID === id);
      })
    }

    //Get product by id of product
    getOneProduct(id: number){
      return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((product) => product.id === id);
      })
    }

    getProductbyUser(userEmail: any){
      return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((product) => product.username === userEmail);
      })
    }

    //Add one product
    Add(data): Observable<any> {
      return this._http.post(this.apiURL, data).map((response: Response) => response.json())
  }
}
