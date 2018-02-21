import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../service/category.service';

@Component({
  selector: 'app-sidebarHome',
  templateUrl: './sidebarHome.component.html',
  styleUrls: ['./sidebarHome.component.css']
})

export class SideBarHomeComponent implements OnInit {
    public categorys: any[];
    constructor(private categoryService: CategoryService) {

    }

    ngOnInit() {
        this.categoryService.getList().subscribe((response: any) => {
          this.categorys = response;
        }, error => alert('Error: ' + error));
    }


}
