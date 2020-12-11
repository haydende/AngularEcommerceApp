import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { AppProduct } from '../model/app-product';
import { SnapshotAction } from '@angular/fire/database';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit, OnDestroy, AfterViewInit {

  query: string;
  displayedColumns: string[] = ['title', 'price', 'category'];
  dataSource: MatTableDataSource<SnapshotAction<AppProduct>>;
  products: SnapshotAction<AppProduct>[];
  productSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource();
    this.productSubscription = this.productService.getAll().snapshotChanges()
      .subscribe(products => {
        this.dataSource.data = products;
        this.products = products.map((li) => {
          return li;
        });
      });
  }

  filter(query: string): void {
    this.dataSource.filter = query.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate =
      (data, query: string) => data.payload.val().title.toLowerCase().includes(query);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
