import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  cartSubscription: Subscription;

  constructor(private cartService: CartService) {
  }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
        // console.log(cart);
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}
