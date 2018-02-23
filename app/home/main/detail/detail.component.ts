import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './../../../service/product.service';
import { AuctionService } from './../../../service/auction.service';
import { ElementRef } from '@angular/core/src/linker/element_ref';

@Component ({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  private productArr: any;
  private id: number;
  private subscription: Subscription;
  public proname: any;
  public brand: any;
  public warrantyperiod: any;
  public note: any;
  private yearpost: any;
  private monthpost: any;
  private daypost: any;
  private username: any;
  private price: number;
  private auctionList: any;
  private x: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService, private auctionService: AuctionService) {

  }
  getAllProduct(){
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productService.getOneProduct(this.id).subscribe((data) => {
      this.productArr = data;
      this.proname = this.productArr.map(function(a) {
        return a['proname'];
      });
      this.brand = this.productArr.map(function(b) {
        return b['brand'];
      });
      this.warrantyperiod = this.productArr.map(function(c) {
        return c['warrantyperiod'];
      });
      this.note = this.productArr.map(function(d) {
        return d['note'];
      });
      this.yearpost = this.productArr.map(function(e) {
        return e['yearpost'];
      });
      this.monthpost = this.productArr.map(function(f) {
        return f['monthpost'];
      });
      this.daypost = this.productArr.map(function(g) {
        return g['daypost'];
      });
      this.username = this.productArr.map(function(h) {
        return h['username'];
      });
    });
  }

  onPrice(value: any){
    this.price = value;
  }

  onClick(){
    const auction = {
      productID: this.id,
      userName: this.username,
      price: this.price
    }

    this.auctionService.getOneAuction(this.id).subscribe((data) => {
      this.productArr = data;
      this.x = this.productArr.map(function(a) {
        return a['userName'];
      });
    });

    console.log(this.x);
    // this.auctionService.Add(auction).subscribe ( response => {
    //   console.log(response);
    //   alert('Đấu giá thành công');
    // }, error => alert('Error: ' + error));
  }

  ngOnInit(){
    this.proname = this.brand = this.warrantyperiod = this.note = this.yearpost = this.monthpost = this.daypost = {};

    this.getAllProduct();

    setTimeout(() => this.productService.countdown(this.yearpost, Number(this.monthpost) , this.daypost), 1000);

    // this.getAll().then(() =>
    // console.log(this.yearpost));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

