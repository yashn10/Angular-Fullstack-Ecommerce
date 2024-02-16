import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddproductComponent } from './seller-addproduct/seller-addproduct.component';
import { SellerProductlistComponent } from './seller-productlist/seller-productlist.component';
import { SellerUpdateproductComponent } from './seller-updateproduct/seller-updateproduct.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartPageComponent } from './cart-page/cart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddproductComponent,
    SellerProductlistComponent,
    SellerUpdateproductComponent,
    UserAuthComponent,
    SearchComponent,
    ProductDetailsComponent,
    MyOrdersComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MDBBootstrapModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
