import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
 
  constructor(private router: Router) {}

  login(uname: string, pword: string) {
    if (uname === 'uname' && pword === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', uname);
      return 200;
    }
    else {
      return 403;
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}