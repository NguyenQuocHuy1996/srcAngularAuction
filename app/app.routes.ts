import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { Page404Component } from './404/page-404.componnent';

import { MainComponent } from './home/main/main.component';

import { MainHomeComponent } from './home/main/main-home/main-home.component';
import { DangSPComponent } from './home/main/dang-sp/dang-sp.component';
import { CategoryComponent } from './home/main/category/category.component';
import { SanPhamDaDangComponent } from './home/main/sp-da-dang/sp-da-dang.component';
import { SanPhamDaDauGiaComponent } from './home/main/sp-da-dau-gia/sp-da-dau-gia.component';
import { DetailComponent } from './home/main/detail/detail.component';
import { ContactComponent } from './home/main/contact/contact.component';
import { AboutUsComponent } from './home/main/about-us/about-us.component';
import { ChiTietSanPhamDaDangComponent } from './home/main/sp-da-dang/chi-tiet-sp-da-dang.component';

import { CheckLoginGuard } from './guards/checkLogin.guard';

const routing: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', component: MainComponent,
        children: [
          { path: '', component: MainHomeComponent },
          { path: 'san-pham/:id', component: DetailComponent },
          { path: 'danh-muc/:id', component: CategoryComponent }
        ]
      },
      // { path: 'dang-san-pham', component: DangSPComponent, canActivate: [CheckLoginGuard] },
      { path: 'dang-san-pham', component: DangSPComponent},
      { path: 'san-pham-da-dau-gia', component: SanPhamDaDauGiaComponent, canActivate: [CheckLoginGuard] },
      { path: 'san-pham-da-dang', component: SanPhamDaDangComponent, canActivate: [CheckLoginGuard],
        children: [
          { path: 'san-pham/:id', component: ChiTietSanPhamDaDangComponent, canActivate: [CheckLoginGuard] }
          // { path: 'san-pham/:id', component: ChiTietSanPhamDaDangComponent }
        ]
      },
      { path: 'lien-he', component: ContactComponent },
      { path: 've-chung-toi', component: AboutUsComponent }
    ]
  },
  { path: 'dang-nhap', component: LoginComponent },
  { path: 'dang-ky', component: RegisterComponent },
  { path: '**', component: Page404Component }
]

export const AppRoutes = RouterModule.forRoot(routing);
