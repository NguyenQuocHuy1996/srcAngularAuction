import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { AuctionService } from './../../../service/auction.service';
import { UserService } from './../../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chiTietspDaDang',
  templateUrl: './chi-tiet-sp-da-dang.component.html',
  styleUrls: ['./sp-da-dang.component.css']
})

export class ChiTietSanPhamDaDangComponent implements OnInit {
  currentUser: any;
  daypost: any;
  monthpost: any;
  yearpost: any;
  product: any;
  public id: number;
  public subscription: Subscription;
  auctionArr: any[];
  userArr: any[];
  productID: number;
  proname: any;
  mainimage: any;

  constructor(private userService: UserService , private auctionService: AuctionService, private router: Router, private activatedRoute: ActivatedRoute ,private productService: ProductService) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  // filterUser(userEmail) {
  //   var userArr = [];
  //   if (this.userArr) {
  //     this.userArr.forEach(user => {
  //       if (String(user.email) === String(userEmail.userName)) {
  //         userArr.push(user);
  //       }
  //     });
  //   }
  //   return userArr;
  // }

  filterUser(userEmail) {
    var userArr = [];
    if (this.userArr) {
      this.userArr.forEach(user => {
        if (String(user.email) === String(userEmail.userName)) {
          userArr.push(user);
        }
      });
    }
    return userArr;
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser){
      this.productService.getOneProduct(this.id).subscribe(res => {
        this.product = res;
        this.proname = this.product.proname;
        this.mainimage = this.product.mainimage;
        this.productService.countdown(this.yearpost, Number(this.monthpost) , this.daypost);

        this.auctionService.getAuctionByIDProduct(Number(this.product.id)).subscribe (res => {
          this.auctionArr = res;
        });

        this.userService.getList().subscribe(res => {
          this.userArr = res;
        });

      });
    }
  }
}
