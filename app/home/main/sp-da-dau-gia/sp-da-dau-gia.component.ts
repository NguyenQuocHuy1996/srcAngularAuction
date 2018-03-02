import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { AuctionService } from './../../../service/auction.service';

@Component({
  selector: 'app-spDaDauGia',
  templateUrl: './sp-da-dau-gia.component.html',
  styleUrls: ['./sp-da-dau-gia.component.css']
})

export class SanPhamDaDauGiaComponent implements OnInit {
  aucArr: any[];
  userEmail: any;
  productArr: any[];
  currentUser: any;
  constructor(private productService: ProductService, private auctionService: AuctionService){

  }

  filterProduct(productID) {
    var arr = [];
    if (this.productArr) {
      this.productArr.forEach(product => {
        if (product.id === productID.productID) {
          arr.push(product);
        }
      });
    }
    return arr;
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.userEmail = this.currentUser.userEmail;
      this.auctionService.getAuctionByUser(String(this.userEmail)).subscribe(res =>{
        this.aucArr = res;
        console.log(this.aucArr);
      });
    }
    this.productService.getList().subscribe(res =>{
      this.productArr = res;
    });
  }
}
