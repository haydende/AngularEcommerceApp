import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/app-user';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapsed = true;
  appUser: AppUser;
  cart: ShoppingCart;
  cartSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart())
      .subscribe((cart: any) => {
        // console.log(cart);
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
