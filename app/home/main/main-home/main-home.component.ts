import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/service/category.service';
import { ProductService } from 'app/service/product.service';
@Component({
  selector: 'app-main',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})

export class MainHomeComponent implements OnInit {
  public categorys: any[];
  public products: any[];
  public order: 'id';

  hoursleft: any;
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


  }
}
