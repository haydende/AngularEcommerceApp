import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../app.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {ShoppingCartComponent} from '../components/shopping-cart/shopping-cart.component';
import {UserOrdersComponent} from '../components/user-orders/user-orders.component';
import {ManageOrdersComponent} from '../components/manage-orders/manage-orders.component';
import {ManageProductComponent} from '../components/manage-product/manage-product.component';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthService} from '../services/auth.service';
import {CheckOutComponent} from '../components/check-out/check-out.component';
import {ProductsComponent} from '../components/products/products.component';
import {AngularFireModule} from '@angular/fire';
import {OrderSuccessComponent} from '../components/order-success/order-success.component';
import {ProductFormComponent} from '../admin/product-form/product-form.component';
import {CategoryService} from '../services/category.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ProductFilterComponent} from '../components/product-filter/product-filter.component';
import {ProductCardComponent} from '../components/product-card/product-card.component';
import {ProductQuantityComponent} from '../components/product-quantity/product-quantity.component';
import {OrderService} from '../services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    UserOrdersComponent,
    ManageOrdersComponent,
    ManageProductComponent,
    HomePageComponent,
    LoginComponent,
    CheckOutComponent,
    ProductsComponent,
    OrderSuccessComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBE5mZiBikG-Wu31jjIkBAQydovgY7yXbo',
      authDomain: 'ecommerce-app-aa581.firebaseapp.com',
      projectId: 'ecommerce-app-aa581',
      storageBucket: 'ecommerce-app-aa581.appspot.com',
      messagingSenderId: '19914501030',
      appId: '1:19914501030:web:bb6aee54c558fa3f2e3d67',
      measurementId: 'G-2KC6HLJN0S'
    }),
  ],
  providers: [AuthService, CategoryService, ProductService, OrderService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {}
