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

  constructor(private auth: AngularFireAuth) {
  }

  get authState(): Observable<User> {
    return this.auth.authState;
  }

  googleLogin(): void {
    this.login(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut()
      .then(r => console.log('Logout successful!'));
  }

  private login(provider: AuthProvider): Promise<void> {
    return this.auth.signInWithRedirect(provider);
  }
}
