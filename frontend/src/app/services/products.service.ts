import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addproducts } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  cartdata = new EventEmitter<addproducts[] | []>

  constructor(private http: HttpClient) { }

  renderurl = 'https://angular-fullstack-ecommerce.onrender.com';
  localhosturl = 'http://localhost:8000';


  addproduct(data: addproducts) {
    return this.http.post(`${this.renderurl}/product`, data);
  }

  productslist() {
    return this.http.get<addproducts[]>(`${this.renderurl}/products`);
  }

  deleteproduct(id: number) {
    return this.http.delete(`${this.renderurl}/product/${id}`);
  }

  getproduct(id: string) {
    return this.http.get<addproducts>(`${this.renderurl}/products/${id}`);
  }

  updateproduct(data: addproducts) {
    return this.http.patch<addproducts>(`${this.renderurl}/product/${data._id}`, data);
  }

  popularproducts() {
    return this.http.get<addproducts[]>(`${this.renderurl}/products/?_limit=3`);
  }

  searchproduct(query: string) {
    return this.http.get<addproducts[]>(`${this.renderurl}/products/?q=${query}`)
  }

  addtocartdata(data: addproducts) {
    let cartdata = [];
    let cart = localStorage.getItem('cart');
    if (cart) {
      cartdata = JSON.parse(cart);
      cartdata.push(data);
      localStorage.setItem('cart', JSON.stringify(cartdata));
    } else {
      localStorage.setItem('cart', JSON.stringify([data]));
    }

    this.cartdata.emit(cartdata);
  }

  removecart(id: number) {
    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      let cart: addproducts[] = JSON.parse(cartdata);
      cart = cart.filter((item: addproducts) => id !== item._id);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartdata.emit(cart);
    }
  }

}
