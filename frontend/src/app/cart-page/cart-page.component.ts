import { Component, OnInit } from '@angular/core';
import { addproducts, details } from '../datatype';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {


  productlist: any[] | undefined
  // details: details | undefined

  constructor(private service: ProductsService, private router: Router) { }


  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      const cartitems = JSON.parse(cart);
      this.productlist = cartitems;
    }

  }


  removetocart(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.removecart(id);
        Swal.fire({
          title: "Successfull!",
          text: "Your item has been removed.",
          icon: "success"
        });
      }
    });
  }

}
