import { Component } from '@angular/core';
import { addproducts } from '../datatype';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-updateproduct',
  templateUrl: './seller-updateproduct.component.html',
  styleUrls: ['./seller-updateproduct.component.scss']
})
export class SellerUpdateproductComponent {

  product: addproducts | undefined


  constructor(private route: ActivatedRoute, private service: ProductsService, private router: Router) {
    let productID = this.route.snapshot.paramMap.get('id');
    productID && this.service.getproduct(productID).subscribe(
      (productdata) => {
        this.product = productdata
      }
    )
  }

  update(data: addproducts) {
    if (this.product) {
      data._id = this.product._id
    }
    this.service.updateproduct(data).subscribe(
      (updated) => {
        if (updated) {
          Swal.fire(
            'Successfull!',
            'Your product details has been updated!',
            'success',
          )
          this.router.navigate(['seller-productlist'])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Your product details was not updated please try again later'
          })
        }
      }
    )
  }

}
