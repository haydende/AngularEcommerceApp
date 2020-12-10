import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Observable, Subscription} from 'rxjs';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';
import {DataTableParams, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit, OnDestroy {

  products: SnapshotAction<AppProduct>[];
  filteredProducts: SnapshotAction<AppProduct>[];
  tableResource: DataTableResource<SnapshotAction<AppProduct>>;
  items: SnapshotAction<AppProduct>[] = [];
  itemCount: number;
  productSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productSubscription = this.productService.getAll().snapshotChanges()
      .subscribe(products => {
        this.filteredProducts = this.products = products.map((li) => {
          // console.log(li);
          return li;
        });
        this.initialiseTable(products);
      });
  }

  filter(query: string): void {
    this.filteredProducts = (query)
      ? this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

  reloadItems(params: DataTableParams): void {
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  private initialiseTable(products: SnapshotAction<AppProduct>[]): void {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }


}
