import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppOrder} from '../../model/app-order';
import {OrderService} from '../../services/order.service';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {ShoppingCart} from '../../model/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  cartSubscription: Subscription;
  name: string;
  address: string;
  city: string;

  constructor(private orderService: OrderService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe((cart: ShoppingCart) => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  submit(order: any): void {
  }

}
