import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppOrder} from '../../model/app-order';
import {OrderService} from '../../services/order.service';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {ShoppingCart} from '../../model/shopping-cart';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/app-user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  userKeySubscription: Subscription;
  cartSubscription: Subscription;
  userKey: string;
  name: string;
  address: string;
  city: string;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe((cart: ShoppingCart) => this.cart = cart);
    this.userKeySubscription = (await this.authService.appUser$)
      .subscribe((user: AppUser) => this.userKey = user.key);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userKeySubscription.unsubscribe();
  }

  submit(order: any): void {
    const orderSubmit = {
      name: order.name,
      address: order.address,
      city: order.city,
      userKey: this.userKey,
      items: this.cart.items
    };
    console.log(orderSubmit);
  }
}
