import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsService } from './services/products.service';
import { addproducts } from './datatype';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  menutype = ''
  sellername = ''
  username = ''
  cart = 0;
  searchitem: addproducts[] | undefined

  constructor(private router: Router, private service: ProductsService) { }


  ngOnInit(): void {
    this.router.events.subscribe(
      (val: any) => {
        if (val.url) {
          if (localStorage.getItem('Seller')) {
            let sellerinfo = localStorage.getItem('Seller')
            let sellerdata = sellerinfo && JSON.parse(sellerinfo)[0]
            this.sellername = sellerdata.name;
            this.menutype = 'seller';
          }

          else if (localStorage.getItem('User')) {
            let userinfo = localStorage.getItem('User');
            let userdata = userinfo && JSON.parse(userinfo);
            this.username = userdata.name;
            this.menutype = 'user';
          }

          else {
            this.menutype = '';
          }
        }
      }
    )
    

    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      this.cart = JSON.parse(cartdata).length;
    } else {
      this.cart = 0;
    }

    this.service.cartdata.subscribe(
      (data) => {
        this.cart = data.length;
      }
    )

  }


  details(id: number) {
    this.router.navigate(['details/' + id]);
  }


  searchproduct(value: string) {
    this.router.navigate([`search/${value}`]);
  }


  search(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.service.searchproduct(element.value).subscribe(
        (data: any) => {
          if (data.length > 5) {
            data.length = 5;
          }
          this.searchitem = data
        }
      )
    }
  }


  clear() {
    this.searchitem = undefined
  }


  logout() {
    Swal.fire({
      title: 'Are you sure to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('Seller')
        this.router.navigate(['seller'])
        Swal.fire(
          'Logout!',
          'You have been successfully logout!',
          'success'
        )
      }
    })
  }


  userlogout() {
    Swal.fire({
      title: 'Are you sure to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('User')
        this.router.navigate(['user-auth'])
        Swal.fire(
          'Logout!',
          'You have been successfully logout!',
          'success'
        )
      }
    })
  }


}
