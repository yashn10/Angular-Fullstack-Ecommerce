import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addproducts } from '../datatype';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  detail: addproducts | undefined
  quantity: number = 1
  removecart = false;

  constructor(private activeroute: ActivatedRoute, private service: ProductsService) { }


  ngOnInit(): void {
    let id = this.activeroute.snapshot.paramMap.get('id');
    id && this.service.getproduct(id).subscribe(
      (data) => {
        this.detail = data;


        let cartdata = localStorage.getItem('cart');
        if (id && cartdata) {
          let items = JSON.parse(cartdata);
          items = items.filter((item: addproducts) => id == item._id.toString());
          if (items.length) {
            this.removecart = true;
          } else {
            this.removecart = false;
          }
        }
      }
    )
  }

  handlequantity(value: string) {
    if (this.quantity < 20 && value == 'plus') {
      this.quantity += 1;
    } else if (this.quantity > 1 && value == 'minus') {
      this.quantity -= 1;
    }
  }

  addtocart() {
    if (this.detail) {
      this.detail.quantity = this.quantity;
      if (localStorage.getItem('user')) {
        this.service.addtocartdata(this.detail);
        this.removecart = true;
      } else {
        this.service.addtocartdata(this.detail);
        this.removecart = true;
      }
    }
  }

  removetocart(id: number) {
    this.service.removecart(id);
    this.removecart = false;
  }

}
