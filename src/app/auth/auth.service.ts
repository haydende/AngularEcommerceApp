import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  GoogleAuth(): Promise<void> {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: AuthProvider): Promise<void> {
    return firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log('Login successful!');
      }).catch((error) => {
        console.log('Login unsuccessful!');
      });
  }
}
