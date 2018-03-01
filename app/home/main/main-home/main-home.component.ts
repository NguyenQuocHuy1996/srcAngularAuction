import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'app/service/category.service';
import { ProductService } from 'app/service/product.service';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-main',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})

export class MainHomeComponent implements OnInit {
  public categorys: any[];
  public products: any[];
  public order: 'id';
  check: boolean;
  hoursleft: any;
  currentUser: any;
  constructor(private categoryService: CategoryService, private productService: ProductService) {

  }

  ngOnInit() {
    //Get all category
    this.categoryService.getList().subscribe((response: any) => {
      this.categorys = response;
    }, error => alert('Error: ' + error));

    //Get all Product
    this.productService.getList().subscribe((response: any) => {
      this.products = response;
    }, error => alert('Error: ' + error));

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser){
      this.check = this.currentUser.check;
    }
  }

  filterProduct( cate) {
    var productArr = [];
    if (this.products) {
      this.products.forEach(product => {
        if (product.cateID === cate.id && productArr.length < 4) {
          productArr.push(product);
        }
      });
    }
    return productArr;
  }
}
