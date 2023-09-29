import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  isLoading = false;

  constructor( private authSrv:AuthService, private router:Router ) { }

  ngOnInit(): void {
  }

  register(form:NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      this.authSrv.signup(form.value).subscribe(
        () => {
          this.isLoading = false;
          alert('Registration success!');
          this.router.navigate(['/login'])
        },
        (error) => {
          // to get backend errors
          console.error(error.error);
          let errorMessage = 'An error occurred during registration.';
          console.log(error.error);
          if (error.error && error.error.errorsList && error.error.errorsList.length > 0) {
            errorMessage = 'Registration failed. Errors:';
            error.error.errorsList.forEach((errorMsg: string) => {
              errorMessage += `\n- ${errorMsg}`;
            });
          } else if (error.error && error.error.message === 'The email has already been used.') {
            errorMessage = 'Email has already been used.';
          } else if (error.error === 'Email format is invalid') {
            errorMessage = 'Email format is invalid!';
          } else if (error.error === 'Password is too short') {
            errorMessage = 'Password must be at least 4 characters!';
          } else if (error.error === 'Email already exists') {
            errorMessage = 'Email already exists!';
          }
          alert(errorMessage);
          this.isLoading = false
        }
      );
    } catch(error) {
      console.error(error);
      this.isLoading = false
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
