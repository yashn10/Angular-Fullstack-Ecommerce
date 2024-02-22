import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { addproducts } from '../datatype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent {


  productlist: addproducts[] | undefined


  constructor(private service: ProductsService) { }


  ngOnInit() {
    this.products();
  }


  addtocart(data: addproducts) {
    this.service.addtocartdata(data);
  }


  products() {
    this.service.productslist().subscribe(
      (products) => {
        this.productlist = products;
      }
    )
  }

}
