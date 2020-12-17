import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AppUser} from '../../model/app-user';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapsed = true;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = (await this.cartService.getCart());
  }

  logout(): void {
    this.authService.logout();
  }
}
