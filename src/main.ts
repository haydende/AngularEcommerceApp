import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBE5mZiBikG-Wu31jjIkBAQydovgY7yXbo',
  authDomain: 'ecommerce-app-aa581.firebaseapp.com',
  projectId: 'ecommerce-app-aa581',
  storageBucket: 'ecommerce-app-aa581.appspot.com',
  messagingSenderId: '19914501030',
  appId: '1:19914501030:web:bb6aee54c558fa3f2e3d67',
  measurementId: 'G-2KC6HLJN0S'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
