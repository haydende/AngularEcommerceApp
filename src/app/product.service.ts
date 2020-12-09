import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {AppProduct} from './model/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product: any): void {
    this.db.list('/products')
      .push(product)
        .then(() => console.log('Product submitted!'))
        .catch(() => console.log('Product could not be submitted!'));
  }

  getByKey(key: string): AngularFireObject<any> {
    return this.db.object(`/products/${key}`);
  }

  getAll(): AngularFireList<AppProduct> {
    const products: AngularFireList<AppProduct> = this.db.list('/products');
    console.log(products);
    return products;
  }
}
