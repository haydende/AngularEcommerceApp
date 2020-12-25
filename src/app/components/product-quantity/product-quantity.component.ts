import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {AppProduct} from '../../model/app-product';
import {ShoppingCartItem} from '../../model/shopping-cart-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() product: ShoppingCartItem;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(product: AppProduct | ShoppingCartItem): number {
    const quantity = this.shoppingCart?.getQuantityOf(product.key);
    return quantity ? quantity : 0;
  }
}
