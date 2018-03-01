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
  private aucArr: any;
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
  private aucID: number;
  private currentUser: any;
  private userName: String;
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService, private auctionService: AuctionService) {

  }
  getAllProduct(){
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productService.getOneProduct(this.id).subscribe((data) => {
      this.productArr = data;
      this.proname = this.productArr.proname;
      this.brand = this.productArr.brand;
      this.warrantyperiod = this.productArr.warrantyperiod;
      this.note = this.productArr.note;
      this.yearpost = this.productArr.yearpost;
      this.monthpost = this.productArr.monthpost;
      this.daypost = this.productArr.daypost;
      this.username = this.productArr.username;
      this.productService.countdown(this.yearpost, Number(this.monthpost) , this.daypost);
    });
  }

  onPrice(value: any){
    this.price = value;
  }

  onClick(){
    const auction = {
      productID: this.id,
      userName: String(this.userName),
      price: this.price
    }

    if (Object.keys(this.aucArr).length){
      this.auctionService.Edit(this.aucID, auction).subscribe ( response => {
        alert('Bạn đã cập nhật giá đấu');
        window.location.reload();
      }, error => alert('Error: ' + error));
    } else {
      this.auctionService.Add(auction).subscribe ( response => {
        alert('Đấu giá thành công');
        window.location.reload();
      }, error => alert('Error: ' + error));
    }
  }
  ngOnInit(){
    this.proname = this.brand = this.warrantyperiod = this.note = this.yearpost = this.monthpost = this.daypost = {};
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userEmail;

    this.getAllProduct();

    // setTimeout(() => this.productService.countdown(this.yearpost, Number(this.monthpost) , this.daypost), 1000);
    // this.productService.countdown(this.yearpost, Number(this.monthpost) , this.daypost);

    // this.getAll().then(() =>
    // console.log(this.yearpost));

    this.auctionService.getOneAuction(this.id, String(this.userName)).subscribe((data) => {
      this.aucArr = data;
      this.aucID = this.aucArr.map(function(e){
        return e['id'];
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

