import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product: any): void {
    this.db
      .list('/products')
      .push(product)
        .then(() => console.log('Product submitted!'))
        .catch(() => console.log('Product could not be submitted!'));
  }
}
