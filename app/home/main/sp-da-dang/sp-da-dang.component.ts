import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { AuctionService } from './../../../service/auction.service';

@Component({
  selector: 'app-spDaDang',
  templateUrl: './sp-da-dang.component.html',
  styleUrls: ['./sp-da-dang.component.css']
})

export class SanPhamDaDangComponent implements OnInit {
  currentUser: any;
  userEmail: string;
  productArr: any[];
  productAuc: any[];

  constructor(private auctionService: AuctionService, private productService: ProductService) {

  }

  getProduct(){
    this.productService.getProductbyUser(String(this.userEmail)).subscribe(res => {
      this.productArr = res;
    });

    this.auctionService.getAuctionByUser(String(this.userEmail)).subscribe(res => {
      this.productAuc = res;
    });
  }
  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.userEmail = this.currentUser.userEmail;
      this.getProduct();
    }
  }
}
