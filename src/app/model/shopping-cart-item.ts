
export class ShoppingCartItem {

  key: string;
  title: string;
  price: number;
  quantity: number = 0;
  category: string;
  imageUrl: string;

  constructor(product: any, key: string) {
    this.title = product.title;
    this.price = product.price;
    this.category = product.category;
    this.imageUrl = product.imageUrl;
    this.quantity = product.quantity;
    this.key = key;
  }

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
