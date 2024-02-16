import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { addproducts } from '../datatype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-productlist',
  templateUrl: './seller-productlist.component.html',
  styleUrls: ['./seller-productlist.component.scss']
})
export class SellerProductlistComponent implements OnInit {


  productlist: addproducts[] | undefined

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.products();
  }

  delete(id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteproduct(id).subscribe(
          (deleteproduct) => {
            if (deleteproduct) {
              Swal.fire(
                'Good job!',
                'Your product has been deleted!',
                'success'
              )
              this.products();
              console.warn(deleteproduct)
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'your product has not deleted try again later'
              })
            }
          }
        )
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your product details are safe',
          'error'
        )
      }
    })
  }

  products() {
    this.service.productslist().subscribe(
      (products) => {
        console.warn(products)
        this.productlist = products;
      }
    )
  }

}
