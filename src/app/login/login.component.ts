import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import firebase from 'firebase';
import User = firebase.User;
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router ) {
    this.authService.authState.subscribe((user: User) => {
      if (user) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '']);
      }
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.googleLogin();
  }

}
