import {Component, Input, OnInit} from '@angular/core';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';
import {CartService} from '../cart.service';
import {ShoppingCart} from '../model/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: SnapshotAction<AppProduct>;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}
