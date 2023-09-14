import { Component, OnInit } from '@angular/core';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  isLoading = false;
  loginError: string | null = null; //

  constructor( private authSrv:AuthService, private router:Router ) { }

  ngOnInit(): void {
  }

    login(form:NgForm) {
    this.isLoading = true;
    console.log(form.value);
    this.loginError = null; //
    try {
      this.authSrv.login(form.value).subscribe(
        () => {
          this.isLoading = false;
          alert('Login success!');
          this.router.navigate(['/'])
        },
        (error:any) => {
          this.isLoading = false;
          this.loginError = 'Wrong login!';
          alert('Wrong login!');
          console.log(error)
        }
      );
    } catch(error:any) {
      this.isLoading = false;
      console.log(error)
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


}
