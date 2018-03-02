import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';

@Injectable()
export class AuctionService {
    private apiURL = "http://5a572260751d4e001277964d.mockapi.io/act/auction/";

    constructor (private _http: Http) {

    }

    // GetOneAuction(productID : number, userName: string): Observable<any[]>{
    //   return this._http.get(this.apiURL).map((response: Response) => response.json().filter((auction) => auction.userName === userName && auction.productID === productID));
    // }

    GetAll(): Observable<any[]>{
      return this._http.get(this.apiURL).map((response: Response) => response.json() )
    }

    getAuctionByIDProduct(id: number):Observable<any[]>{
        return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((auction) => auction.productID === id );
      })
    }

    //Get Auction by id of product and username
    getOneAuction(id: number, userEmail: String){
      return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((auction) => auction.productID === id && String(auction.userName) === String(userEmail));
      })
    }
    getAuctionByID(id: number){
      return this._http.get(this.apiURL + id)
        .map( res => {
          return res.json();
      })
    }

    getAuctionByUser(userEmail: String){
      return this._http.get(this.apiURL)
        .map( res => {
          return res.json().filter((auction) => String(auction.userName) === String(userEmail));
      })
    }

    Add(data): Observable<any>{
      return this._http.post(this.apiURL, data).map((response: Response) => response.json())
    }
    Edit(id: number, data: any): Observable<any>{
      return this._http.put(this.apiURL + id, data).map((response: Response) => response.json())
    }
}
