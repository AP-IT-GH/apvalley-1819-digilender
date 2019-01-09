import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    //this.isUserInlogged()
  }

  // async isUserInlogged() {
  //   const user = await this.auth.isLoggedIn()
  //   if (user) {
  //     this.router.navigate(['/home'], { relativeTo: this.route });
  //   } 
  //    else {
  //      this.router.navigate(['/auth'], { relativeTo: this.route });
  //    }
  // }

  login() {
    this.auth.login()
    //this.isUserInlogged()
  }

  logout() {
    this.auth.logout()
  }

}
