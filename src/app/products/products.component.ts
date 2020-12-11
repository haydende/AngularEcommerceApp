import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  productServiceSubscription: Subscription;
  category: string;
  productList: SnapshotAction<AppProduct>[];
  filteredProductList: SnapshotAction<AppProduct>[];

  products$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
    this.products$ = productService.getAll().snapshotChanges();
    this.categories$ = categoryService.getAll().snapshotChanges();

    this.productServiceSubscription = this.products$.subscribe((snapshotActionList) => {
      this.productList = snapshotActionList;

      this.routeSubscription = this.route.queryParamMap.subscribe(params => {
        const category = params.get('category');
        this.category = category ? category : '';

        this.filteredProductList = this.productList.filter((product: SnapshotAction<AppProduct>) => {
          return this.category === ''
            // if the category param is empty, just return all items
            ? true
            // if the category param is not empty, return the result of matching category value
            : product.payload.val().category.toLowerCase() === this.category.toLowerCase();
        });
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Unsubscribing from routeSubscription...');
    this.routeSubscription.unsubscribe();
    console.log('Unsubscribing from productServiceSubscription...');
    this.productServiceSubscription.unsubscribe();
  }

}
