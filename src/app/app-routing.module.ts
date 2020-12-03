import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {ManageOrdersComponent} from './manage-orders/manage-orders.component';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {AppComponent} from './app.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'my-orders', component: UserOrdersComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'products', component: ManageProductComponent },
      { path: '**', component: HomePageComponent }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
