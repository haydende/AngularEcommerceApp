import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import { Observable, of } from 'rxjs';
import AuthProvider = firebase.auth.AuthProvider;
import { AppUser } from '../model/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private auth: AngularFireAuth) {
  }

  get authState$(): Observable<User> {
    return this.auth.authState;
  }

  get appUser$(): Observable<AppUser> {
    return this.auth.authState
      .pipe(switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  googleLogin(): void {
    this.login(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut()
      .then(() => console.log('Logout successful!'));
  }

  private login(provider: AuthProvider): Promise<void> {
    return this.auth.signInWithRedirect(provider);
  }
}
