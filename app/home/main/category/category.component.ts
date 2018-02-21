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
  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {
  }

  ngOnInit(){
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productService.getProductbyID(this.id).subscribe((data) => {
      //this.router.navigate(['/danh-muc', this.id]);
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
