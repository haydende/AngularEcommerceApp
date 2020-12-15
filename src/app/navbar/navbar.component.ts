import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AppUser} from '../model/app-user';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapsed = true;
  appUser: AppUser;
  shoppingCartTotalItems: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit(): Promise<void> {
    const cart$ = await this.cartService.getCart();
    cart$.snapshotChanges().subscribe(snapshotAction => {
      this.shoppingCartTotalItems = 0;
      const cart = snapshotAction.payload.val();
      for (const productId in cart.items) {
        this.shoppingCartTotalItems += cart.items[productId].quantity;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
