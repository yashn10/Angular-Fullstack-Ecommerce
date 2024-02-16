import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { addproducts } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  products: addproducts[] | undefined
  allproducts: addproducts[] | undefined

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.service.popularproducts().subscribe(
      (popular) => {
        this.products = popular;
      }
    )

    this.service.productslist().subscribe(
      (data) => {
        this.allproducts = data;
      }
    )
  }

  addtocart(data: addproducts) {
    this.service.addtocartdata(data);
  }

}
