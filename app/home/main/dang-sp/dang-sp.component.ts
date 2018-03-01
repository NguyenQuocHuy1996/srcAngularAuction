import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../../../service/product.service';
import { LoginService } from './../../../service/login.service';
import { CategoryService } from './../../../service/category.service';
import { UploadMetadata, FileHolder } from 'angular2-image-upload';
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
  check: any;

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

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // $(document).ready(function(){
    //     $('#btnTest').click(function(){
    //       alert('Mày làm được rồi');
    //     });
    // });

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
      mainimage: 'mainimage 2',
      note: this.note,
      username: String(this.currentUser.userEmail),
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


  private fileCounter = 0;

  onBeforeUpload = (metadata: UploadMetadata) => {
    if (this.fileCounter % 2 === 0) {
      metadata.abort = true;
    } else {
      // mutate the file or replace it entirely - metadata.file
      metadata.url = 'http://somewhereelse.com'
    }

    this.fileCounter++;
    return metadata;
  };


  imageFinishedUploading(file: FileHolder) {
    var response = JSON.stringify(file.serverResponse);
    console.log(response);
  }

  onRemoved(file: FileHolder) {
    // do some stuff with the removed file.
  }

  onUploadStateChanged(state: boolean) {
    // console.log(JSON.stringify(state));
  }
}


