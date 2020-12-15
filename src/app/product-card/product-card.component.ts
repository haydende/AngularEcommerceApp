import {Component, Input, OnInit} from '@angular/core';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: SnapshotAction<AppProduct>;
  @Input() showActions = true;
  @Input() shoppingCart;

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

  getQuantity(): number {
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
