import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { addproducts } from '../datatype';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{


  search: addproducts[] | undefined
  constructor(private activeroute: ActivatedRoute, private service: ProductsService) {}


  ngOnInit(): void {
    let query = this.activeroute.snapshot.paramMap.get('query');
    query && this.service.searchproduct(query).subscribe(
      (data) => {
        this.search = data;
      }
    )
  }

}
