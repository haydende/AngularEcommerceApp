import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {ShoppingCart} from '../model/shopping-cart';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(private cartService: CartService) {
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

}
