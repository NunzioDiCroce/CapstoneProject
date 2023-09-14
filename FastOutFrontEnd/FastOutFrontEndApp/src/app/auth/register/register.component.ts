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

  // metodo di registrazione GESTIONE ERRORI SI
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
          console.error(error.error);
          if(error.error === 'Email format is invalid') {
            alert('Email format is invalid!')
          } else if(error.error === 'Email already exists') {
            alert('Email already exists!')
          } else if(error.error === 'Password is too short') {
            alert('Password must be at least 4 characters!')
          }
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
