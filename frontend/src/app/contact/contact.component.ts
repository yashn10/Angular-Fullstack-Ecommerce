import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { contacts } from '../datatype';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {


  userForm!: FormGroup


  constructor(private backend: UserService, private formbuilder: FormBuilder) {
    this.userForm = this.formbuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      message: ['']
    })
  }

  addcontacts(data: contacts) {
    this.backend.usercontact(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire(
            'Good job!',
            'Your message received successfully!',
            'success'
          )
          console.log("Your message received successfully");
          this.clear();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please try again later'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please fill valid data'
        })
      }
    )
  }


  clear() {
    this.userForm.reset();
  }

}
