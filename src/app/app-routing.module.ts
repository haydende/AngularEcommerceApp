import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import {ProductFormComponent} from './admin/product-form/product-form.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
    {
        path: '',
        component: HomePageComponent
    }, {
        path: 'products',
        component: ProductsComponent
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'cart',
        component: ShoppingCartComponent
    }, {
        path: 'checkout',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'my-orders',
        component: UserOrdersComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'admin/orders',
        component: ManageOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    }, {
        path: 'admin/products',
        component: ManageProductComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    }, {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    }, {
        path: 'admin/products/:key',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    }
], { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
