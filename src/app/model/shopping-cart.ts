import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: Map<string, ShoppingCartItem>) {
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      // console.log(item);
      if (productId === 'placeholder') {
        continue;
      }
      this.items.push(new ShoppingCartItem(item, productId));
    }
  }

  getQuantityOf(productId: string): number {
    const item = this.itemsMap[productId];
    return item ? item.quantity : 0;
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
    for (const product of this.items) {
      totalPrice += product.price * product.quantity;
    }
    return totalPrice;
  }
}
