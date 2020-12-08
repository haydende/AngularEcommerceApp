import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  product$: Observable<SnapshotAction<AppProduct>[]>;

  constructor(private productService: ProductService) {
    this.product$ = this.productService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

}
