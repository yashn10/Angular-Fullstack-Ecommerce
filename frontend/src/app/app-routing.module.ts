import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddproductComponent } from './seller-addproduct/seller-addproduct.component';
import { SellerProductlistComponent } from './seller-productlist/seller-productlist.component';
import { SellerUpdateproductComponent } from './seller-updateproduct/seller-updateproduct.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },

  {
    path:'seller',
    component:SellerAuthComponent
  },

  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'seller-addproduct',
    component:SellerAddproductComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'seller-productlist',
    component:SellerProductlistComponent
  },

  {
    path:'seller-updateproduct/:id',
    component:SellerUpdateproductComponent
  },

  {
    path:'user-auth',
    component:UserAuthComponent
  },

  {
    path:'search/:query',
    component:SearchComponent
  },

  {
    path:'details/:id',
    component:ProductDetailsComponent
  },

  {
    path:'my-orders',
    component:MyOrdersComponent
  },

  {
    path:'cart-page',
    component:CartPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
