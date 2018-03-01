import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../service/product.service';

@Component({
  selector: 'app-spDaDang',
  templateUrl: './sp-da-dang.component.html',
  styleUrls: ['./sp-da-dang.component.css']
})

export class SanPhamDaDangComponent implements OnInit {
  currentUser: any;
  userEmail: string;
  productArr: any[];

  constructor(private productService: ProductService) {

  }

  getProduct(){
    this.productService.getProductbyUser(String(this.userEmail)).subscribe(res => {
      this.productArr = res;
      console.log(this.productArr);
    });
  }
  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userEmail = this.currentUser.userEmail;

    this.getProduct();

    console.log(this.userEmail);
  }
}
