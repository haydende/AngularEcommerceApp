import { Injectable } from '@angular/core';
import firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (this.user !== null) {
        this.user.reload();
      } else {
        this.user = user;
      }
    });
  }

  GoogleAuth(): Promise<void> {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  Logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  GetUser(): firebase.User {
    return firebase.auth().currentUser;
  }

  private AuthLogin(provider: AuthProvider): Promise<void> {
    return firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log('Login successful!');
      }).catch((error) => {
        console.log('Login unsuccessful!');
      });
  }
}
