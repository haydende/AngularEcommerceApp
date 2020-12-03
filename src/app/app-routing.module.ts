import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {ManageOrdersComponent} from './manage-orders/manage-orders.component';
import {ManageProductComponent} from './manage-product/manage-product.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'my-orders', component: UserOrdersComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'products', component: ManageProductComponent }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
