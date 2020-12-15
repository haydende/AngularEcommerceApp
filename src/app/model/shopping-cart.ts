import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [key: string]: ShoppingCartItem }) {
    for (const productId in itemsMap) {
      this.items.push(itemsMap[productId]);
    }
  }

  get totalItems(): number {
    let totalItems = 0;
    for (const productId in this.items) {
      totalItems += this.items[productId].quantity;
    }
    return totalItems;
  }
}
