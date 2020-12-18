import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from '../model/shopping-cart';
import {ShoppingCartItem} from '../model/shopping-cart-item';
import {Observable} from 'rxjs';
import ThenableReference = firebase.database.ThenableReference;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    // todo: All work concerning unpacking the data from SnapshotAction wrappers should be done here
    console.log('Getting cartId');
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map((value: any) => {
      return new ShoppingCart(value.payload.val().items);
    }));
  }

  async addToCart(product: ShoppingCartItem): Promise<void> {
    // console.log(product);
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: ShoppingCartItem): Promise<void> {
    this.updateItemQuantity(product, -1);
  }

  private create(): ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      items: []
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    let exists = false;
    if (cartId) {
      // console.log(cartId);
      const snapshot = await this.db.database.ref(`shopping-carts/${cartId}/`).get();
      exists = snapshot.exists();
      // console.log('Exists: ', exists);
      if (!exists) {
        cartId = this.create().key;
        localStorage.setItem('cartId', cartId);
      }
      return cartId;
    } else {
      cartId = this.create().key;
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  }

  private async getCartItem(cartId: string, productId: string): Promise<AngularFireObject<ShoppingCartItem>> {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async updateItemQuantity(product: ShoppingCartItem, change: number): Promise<void> {
    console.log(product);
    const cartId = await this.getOrCreateCartId();
    const item$ = await this.getCartItem(cartId, product.key);
    item$.valueChanges().pipe(take(1))
      .subscribe((p: ShoppingCartItem) => {
        item$.update({
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
          quantity: (p?.quantity || 0) + change
        });
      });
  }
}
