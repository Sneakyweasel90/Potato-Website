import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = "";
  password = "";
  errorMsg = "";

  constructor(private auth: Auth, private router: Router ) {

  }

  login() {
  if (this.username.trim().length === 0) {
    this.errorMsg = "Username required!";
  }
  else if (this.password.trim().length === 0) {
    this.errorMsg = "Password required!";
  }
  else {
    this.errorMsg = "";
    let res = this.auth.login(this.username, this.password);
    if (res === 200) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['home']);
      });
    }
    if (res === 403) {
      this.errorMsg = "Invalid Credentials";
    }
  }
}
}