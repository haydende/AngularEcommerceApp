import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import firebase from 'firebase';
import User = firebase.User;
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  collapsed = true;
  constructor(private authService: AuthService) {
    this.user$ = authService.authState;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
