import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, SnapshotAction} from '@angular/fire/database';
import firebase from 'firebase';
import {AppProduct} from './model/app-product';
import {take} from 'rxjs/operators';
import ThenableReference = firebase.database.ThenableReference;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<any> {
    console.log('Getting cartId');
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: SnapshotAction<AppProduct>): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const item$ = await this.getCartItem(cartId, product.key);
    item$.valueChanges().pipe(take(1))
      .subscribe((p: any) => {
        item$.update({product: product.key, quantity: (p?.quantity || 0) + 1});
      });
  }

  private create(): ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      items: []
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async getCartItem(cartId: string, productId: string): Promise<AngularFireObject<any>> {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

}
