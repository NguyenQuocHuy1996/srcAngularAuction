import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../service/product.service';
import { Subscription } from 'rxjs';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  public products: any[];
  public id: number;
  public subscription: Subscription;
  win: any;
  height: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {
    this.height = 290;
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getID();
  }

  getID() {
    // this.productService.getProductbyID(this.id).subscribe((data: any) => {
    //   this.products = data;
    // }, error => alert('Error: ' + error));


    this.productService.getProductbyID(this.id).subscribe((response: any) => {
      this.products = response;
    }, error => alert('Error: ' + error));

  }
  getProductWithID(){
    this.productService.getProductbyID(this.id).subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit() {
    debugger;
    this.getID();

    // this.getProductWithID();

    // setTimeout(() => this.getProductWithID(), 1000);

    // this.router.navigateByUrl('/danh-muc');
    // //this.route.navigateByUrl('/componentC', true);
  }

  loadMore() {
    this.height += 290;
    document.getElementById('wrapper-sp').style.height = this.height + 'px';
  }


}
