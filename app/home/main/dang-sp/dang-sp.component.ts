import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { LoginService } from './../../../service/login.service';
import { CategoryService } from './../../../service/category.service';

//CountDown Time


@Component ({
  selector: 'app-dangSP',
  templateUrl: './dang-sp.componnent.html',
  styleUrls: ['./dang-sp.component.css']
})
export class DangSPComponent implements OnInit {
  public products: any[];
  public categorys: any[];
  proname: string;
  brand: string;
  warrantyperiod: string;
  note: string;
  cateID: number;
  date = new Date();
  expiredDate: Date;
  day: number;
  month: number;
  year: number;
  expiredHours: number;

  constructor(private productService: ProductService, private loginService: LoginService, private categoryService: CategoryService) {

  }

  ngOnInit(){
    this.productService.getProductbyUser(String(this.loginService.UserName())).subscribe((data) => {
      this.products = data;
    });

    this.categoryService.getList().subscribe((response: any) => {
      this.categorys = response;
    }, error => alert('Error: ' + error));

    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
  }

  onProNameType(value: any){
    this.proname = value;
  }
  onBrandType(value: any){
    this.brand = value;
  }
  onWarrantyperiodType(value: any){
    this.warrantyperiod = value;
  }
  onNoteType(value: any){
    this.note = value;
  }

  callType(value: number){
    this.cateID = value;
  }
  onHours(value: number){
    this.expiredHours = value;

    //Thuật toán ngày hết hạn đấu giá
    if (String(this.expiredHours) === '72'){
      this.expiredDate = new Date(this.year, this.month, this.day + 3);
    }
    if (String(this.expiredHours) === '48'){
      this.expiredDate = new Date(this.year, this.month, this.day + 2);
    }
    if (String(this.expiredHours) === '24'){
      this.expiredDate = new Date(this.year, this.month, this.day + 1);
    }
  }

  onSubmit(){
    const product = {
      cateID: this.cateID,
      proname: this.proname,
      brand: this.brand,
      warrantyperiod: this.warrantyperiod,
      auction: 15,
      mainimage: 'mainimage 2',
      smallimage1: 'smallimage1 2',
      smallimage2: 'smallimage2 2',
      smallimage3: 'smallimage3 2',
      note: this.note,
      username: this.loginService.UserName(),
      yearpost: this.expiredDate.getFullYear(),
      monthpost: this.expiredDate.getMonth(),
      daypost: this.expiredDate.getDate()
    }
    this.productService.Add(product).subscribe(respone => {
        console.log(respone);
        alert('Đăng sản phẩm thành công');
        //this.router.navigate(['/']);
    }, error => alert('Error: ' + error));
  }
}


