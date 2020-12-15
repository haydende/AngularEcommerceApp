import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[];

  constructor(items: ShoppingCartItem[]) {
    this.items = items;
  }

  get totalItems(): number {
    let totalItems = 0;
    for (const productId in this.items) {
      totalItems += this.items[productId].quantity;
    }
    return totalItems;
  }
}
