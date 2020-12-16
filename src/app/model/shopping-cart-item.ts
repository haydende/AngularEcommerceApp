
export class ShoppingCartItem {

  title: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;

  constructor(product: any) {
    this.title = product.title;
    this.price = product.price;
    this.category = product.category;
    this.imageUrl = product.imageUrl;
    this.quantity = product.quantity;
  }

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
