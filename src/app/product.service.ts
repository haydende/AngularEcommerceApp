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

  update(key: string, product: AppProduct): Promise<void> {
    return this.db.object(`/products/${key}`).update(product);
  }

  getByKey(key: string): AngularFireObject<any> {
    return this.db.object(`/products/${key}`);
  }

  getAll(): AngularFireList<AppProduct> {
    return this.db.list('/products');
  }

  delete(key: string): Promise<void> {
    return this.db.object(`/products/${key}`).remove();
  }
}
