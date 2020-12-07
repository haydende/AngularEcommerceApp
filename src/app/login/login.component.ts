import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import firebase from 'firebase';
import User = firebase.User;
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStateSubscription: Subscription;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.authStateSubscription = this.authService.authState$.subscribe((user: User) => {
      if (user) {
        this.userService.save(user);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '']);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  login(): void {
    this.authService.googleLogin();
  }

}
