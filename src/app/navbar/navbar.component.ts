import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import firebase from 'firebase';
import User = firebase.User;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.Logout()
      .then(() => {
        console.log('Log out successful!');
      }).catch(() => {
        console.log('Log out unsuccessful!');
    });
  }

  get User(): User {
    return this.authService.GetUser();
  }

}
