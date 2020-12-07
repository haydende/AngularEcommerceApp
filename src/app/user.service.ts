import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import User = firebase.User;
import {AppUser} from './model/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {}

  save(user: User): void {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
