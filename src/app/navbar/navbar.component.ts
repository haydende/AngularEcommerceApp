import {Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AppUser} from '../model/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  appUser: AppUser;
  constructor(private authService: AuthService) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
