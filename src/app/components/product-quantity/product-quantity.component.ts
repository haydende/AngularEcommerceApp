import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {AppProduct} from '../../model/app-product';
import {SnapshotAction} from '@angular/fire/database';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() product;
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

  getQuantity(product: SnapshotAction<AppProduct>): number {
    const quantity = this.shoppingCart.getQuantityOf(product.key);
    return quantity ? quantity : 0;
  }
}
