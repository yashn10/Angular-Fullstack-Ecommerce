import { Component, OnInit } from '@angular/core';
import { login, signup } from '../datatype';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {


  islogin = false;
  loginForm!: FormGroup
  sellerSignup!: FormGroup

  constructor(private user: UserService, private router: Router, private http: HttpClient, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('User')) {
      this.router.navigate(['']);
    }

    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    })

    this.sellerSignup = this.formbuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }


  signup(data: signup) {
    this.http.get<any>("http://localhost:8000/userregister").subscribe((res) => {
      const user = res.find((a: any) => {
        return a.email === this.sellerSignup.value.email && a.password === this.sellerSignup.value.password
      })
      if (user) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'User already exists with this email or password',
          footer: 'Please choose a different email or login'
        })
      } else {
        this.user.usersignup(data).subscribe(
          (userdata) => {
            console.log("userdata", userdata);
            Swal.fire({
              title: 'Successfull',
              text: "Your registration has been successfull!",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'proceed to login!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.islogin = true;
              }
            })
          }
        ), Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'User registration failed please try again later'
        })
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Error occurs from server side please try again'
      })
      console.log(error, "error");
    }
    )

  }


  loginuser(data: login) {
    this.user.userlogin(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire(
            'Good job!',
            'You login successfully!',
            'success'
          )
          localStorage.setItem("User", JSON.stringify(response));
          console.log("User login successfully");
          this.router.navigate(['']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'User login failed please try again'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Incorrect credentials'
        })
        console.error("Error during login:", error);
      }
    )
  }


  signupnow() {
    this.islogin = false
  }


  login() {
    this.islogin = true
  }

}
