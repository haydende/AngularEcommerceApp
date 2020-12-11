import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppProduct} from '../../model/app-product';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  key: string;
  product: AppProduct = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };

  constructor(private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private productService: ProductService) {
    this.key = this.route.snapshot.paramMap.get('key');
    // console.log(key);
    if (this.key) {
      this.productService.getByKey(this.key).snapshotChanges().pipe(take(1)).subscribe(snapshotAction => {
        this.product.title = snapshotAction.payload.val().title;
        this.product.price = snapshotAction.payload.val().price;
        this.product.category = snapshotAction.payload.val().category;
        this.product.imageUrl = snapshotAction.payload.val().imageUrl;
        // console.log(`Title: ${this.product.title}, Price: ${this.product.price}, Category: ${this.product.category}, Image URL:
        // ${this.product.imageUrl}`);
      });
    }

    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

  save(product): void {
    if (this.key) {
      this.productService.update(this.key, this.product)
        .then(() => null);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['admin/products']);
  }

  delete(): void {
    console.log(this.key);
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.key);
      this.router.navigate(['admin/products']);
    }
  }
}
