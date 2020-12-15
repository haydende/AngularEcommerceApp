import {AppProduct} from './app-product';

export class ShoppingCartItem {

  constructor(public product: AppProduct, public quantity: number) {
  }

  get totalPrice(): number {
    return parseFloat(this.product.price) * this.quantity;
  }
}
