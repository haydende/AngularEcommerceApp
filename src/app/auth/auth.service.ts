import {Injectable, Provider} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
  }

  get authState(): Observable<User> {
    return this.auth.authState;
  }

  googleLogin(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log('Starting google login');
    this.login(new firebase.auth.GoogleAuthProvider(), returnUrl)
      .then(() => {
        console.log('This code is being executed!');
      });
    this.router.navigateByUrl('test');
  }

  logout(): void {
    this.auth.signOut()
      .then(r => console.log('Logout successful!'));
  }

  private login(provider: AuthProvider, returnUrl?: string): Promise<void> {
    console.log('Redirecting...');
    return this.auth.signInWithRedirect(provider);
  }
}
