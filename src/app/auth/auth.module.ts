import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ]
})
export class AuthModule { }
