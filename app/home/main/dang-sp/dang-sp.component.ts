import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { LoginService } from './../../../service/login.service';
import { CategoryService } from './../../../service/category.service';
import { UploadMetadata, FileHolder } from 'angular2-image-upload';
import { Router } from '@angular/router';
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
  currentUser: any;
  currentPost: any;
  check: any;
  public imgLink: any;

  constructor(private router: Router, private productService: ProductService, private loginService: LoginService, private categoryService: CategoryService) {

  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.categoryService.getList().subscribe((response: any) => {
        this.categorys = response;
      }, error => alert('Error: ' + error));

      this.productService.getProductbyUser(String(this.currentUser.userEmail)).subscribe((data) => {
        this.products = data;
        console.log(this.products);
      });
    } else{
      this.router.navigate(['/']);
    }


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
    this.imgLink = (<HTMLInputElement>document.getElementById('imgLink')).value;
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    const product = {
      cateID: this.cateID,
      proname: this.proname,
      brand: this.brand,
      warrantyperiod: this.warrantyperiod,
      mainimage: this.imgLink,
      note: this.note,
      username: String(this.currentUser.userEmail),
      yearpost: this.expiredDate.getFullYear(),
      monthpost: this.expiredDate.getMonth(),
      daypost: this.expiredDate.getDate()
    }
    if(this.imgLink === null || this.imgLink === '' || this.imgLink === 'null'){
      alert('Đã có lỗi xảy ra, vui lòng thử lại');
      window.location.reload();
    } else{
      this.productService.Add(product).subscribe(respone => {
          alert('Đăng sản phẩm thành công');
          window.location.reload();
      }, error => alert('Error: ' + error));
    }
  }


  //private fileCounter = 0;

  // onBeforeUpload = (metadata: UploadMetadata) => {
  //   if (this.fileCounter % 2 === 0) {
  //     metadata.abort = true;
  //   } else {
  //     // mutate the file or replace it entirely - metadata.file
  //     metadata.url = 'http://somewhereelse.com'
  //   }

  //   this.fileCounter++;
  //   return metadata;
  // };

  // imageFinishedUploading(file: FileHolder) {
  //   var obj = JSON.parse(JSON.stringify(file.serverResponse));
  //   //var obj = file.serverResponse;
  //   this.text = obj;
  //   console.log(obj._body.data.link);
  // }

  // onRemoved(file: FileHolder) {
  //   // do some stuff with the removed file.
  // }

  // onUploadStateChanged(state: boolean) {
  //   // console.log(JSON.stringify(state));
  // }
}


