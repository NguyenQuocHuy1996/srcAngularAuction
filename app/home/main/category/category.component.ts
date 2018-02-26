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

export class CategoryComponent implements OnInit, OnDestroy {
  public products: any[];
  public id: number;
  public subscription: Subscription;
  win: any;
  height: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {
    this.height = 290;
  }

  getID(){
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  getProductWithID(){
    this.productService.getProductbyID(this.id).subscribe((data) => {
      //this.router.navigate(['/danh-muc', this.id]);
      this.products = data;
    });
  }
  ngOnInit(){
    this.getID();

    this.getProductWithID();

    // setTimeout(() => this.getProductWithID(), 1000);

    // this.router.navigateByUrl('/danh-muc');
    // //this.route.navigateByUrl('/componentC', true);
  }

  loadMore() {
    this.height += 290;
    document.getElementById('wrapper-sp').style.height = this.height+ 'px';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
