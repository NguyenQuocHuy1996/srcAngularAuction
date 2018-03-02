import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../service/product.service';
import { CategoryService } from './../../../service/category.service';
import { Subscription } from 'rxjs';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  categoryName: any;
  category: any;
  public products: any[];
  public id: number;
  public subscription: Subscription;
  win: any;
  height: number;
  constructor(private categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {

  }
  // getProductWithID(){
  //   this.productService.getProductbyID(this.id).subscribe((data) => {
  //     this.products = data;
  //   });
  // }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.productService.getProductbyID(this.id).subscribe((response: any) => {
        this.products = response;
      }, error => alert('Error: ' + error));
      this.categoryService.getOneCategory(this.id).subscribe(res => {
        this.category = res;
        this.categoryName = this.category.name;
      });
    });
  }

  // loadMore() {
  //   this.height += 290;
  //   document.getElementById('wrapper-sp').style.height = this.height + 'px';
  // }


}
