import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [key: string]: ShoppingCartItem }) {
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalItems(): number {
    let totalItems = 0;
    for (const productId in this.items) {
      totalItems += this.items[productId].quantity;
    }
    return totalItems;
  }

  get totalPrice(): number {
    let totalPrice = 0;
    for (const productId in this.items) {
      totalPrice += this.items[productId].totalPrice;
    }
    return totalPrice;
  }
}
