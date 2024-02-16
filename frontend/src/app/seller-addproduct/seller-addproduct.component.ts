import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { addproducts } from '../datatype';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-addproduct',
  templateUrl: './seller-addproduct.component.html',
  styleUrls: ['./seller-addproduct.component.scss']
})
export class SellerAddproductComponent {

  @ViewChild('addproduct')
  addproduct!: NgForm

  constructor(private products: ProductsService) { }


  addproducts(data: addproducts) {
    this.products.addproduct(data).subscribe(
      (product) => {
        if (product) {
          console.warn(product)
          this.addproduct.reset();
          Swal.fire(
            'Successfull!',
            'Your product has been added!',
            'success',
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Your product not added please try again later'
          })
        }
      }
    )
  }

}
