import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './../../../service/product.service';

@Component ({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  public productArr: any;
  public id: number;
  public subscription: Subscription;
  public proname: any;
  public brand: any;
  public warrantyperiod: any;
  public note: any;
  public username: any;
  yearpost: any;
  monthpost: any;
  daypost: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {
  }

  ngOnInit(){
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productService.getOneProduct(this.id).subscribe((data) => {
      this.productArr = data;
      this.proname = this.productArr.map(function(a) {
        return a['proname'];
      });
      this.brand = this.productArr.map(function(b) {
        return b['brand'];
      });
      this.warrantyperiod = this.productArr.map(function(c) {
        return c['warrantyperiod'];
      });
      this.note = this.productArr.map(function(d) {
        return d['note'];
      });
      this.yearpost = this.productArr.map(function(e) {
        return e['yearpost'];
      });
      this.monthpost = this.productArr.map(function(f) {
        return f['monthpost'];
      });
      this.daypost = this.productArr.map(function(g) {
        return g['daypost'];
      });
    });

    this.productService.countdown(this.yearpost, this.monthpost, this.daypost);
    alert(this.yearpost);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

