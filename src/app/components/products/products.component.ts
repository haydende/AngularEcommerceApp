import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppProduct} from '../../model/app-product';
import {SnapshotAction} from '@angular/fire/database';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../model/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  category: string;

  cartServiceSubscription: Subscription;
  productServiceSubscription: Subscription;
  routeSubscription: Subscription;

  productList: AppProduct[] = [];
  filteredProductList: AppProduct[];

  products$;
  categories$;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.products$ = productService.getAll().snapshotChanges();
    this.categories$ = categoryService.getAll().snapshotChanges();

    this.productServiceSubscription = this.products$.subscribe((snapshotActionList: SnapshotAction<AppProduct>[]) => {
      snapshotActionList.forEach(snapshotAction => {
        console.log(snapshotAction.payload.val());
        this.productList.push(new AppProduct(snapshotAction.payload.val(), snapshotAction.key));
      });

      this.routeSubscription = this.route.queryParamMap.subscribe(params => {
        const category = params.get('category');
        this.category = category ? category : '';

        this.filteredProductList = this.productList.filter((product: AppProduct) => {
          return this.category === ''
            // if the category param is empty, just return all items
            ? true
            // if the category param is not empty, return the result of matching category value
            : product.category.toLowerCase() === this.category.toLowerCase();
        });
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.cartServiceSubscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    console.log('Unsubscribing from cartServiceSubscription');
    this.cartServiceSubscription.unsubscribe();
    console.log('Unsubscribing from productServiceSubscription...');
    this.productServiceSubscription.unsubscribe();
    console.log('Unsubscribing from routeSubscription...');
    this.routeSubscription.unsubscribe();
  }

}
