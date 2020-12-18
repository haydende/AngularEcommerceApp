import {Component, Input, OnInit} from '@angular/core';
import {AppProduct} from '../../model/app-product';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {ShoppingCartItem} from '../../model/shopping-cart-item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: AppProduct;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(new ShoppingCartItem(this.product, this.product.key));
  }
}
