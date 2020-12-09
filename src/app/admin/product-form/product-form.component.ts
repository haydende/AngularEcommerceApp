import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../product.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

const URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  form: FormGroup;
  title = '';
  price = '';
  category = '';
  imageUrl = '';

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService,
              private fb: FormBuilder) {

    const key = this.route.snapshot.paramMap.get('key');
    console.log(key);
    if (key) {
      this.productService.getByKey(key).snapshotChanges().subscribe(snapshotAction => {
        this.title = snapshotAction.payload.val().title;
        this.price = snapshotAction.payload.val().price;
        this.category = snapshotAction.payload.val().category;
        this.imageUrl = snapshotAction.payload.val().imageUrl;
        console.log(`Title: ${this.title}, Price: ${this.price}, Category: ${this.category}, Image URL: ${this.imageUrl}`);
      });
    }


    this.categories$ = categoryService.getCategories();

    this.form = fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(URL_PATTERN)]]
    });
  }

  ngOnInit(): void {
  }

  save(product): void {
    // console.log(product);
    this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

  get _title(): AbstractControl {
    return this.form.get('title');
  }

  get _price(): AbstractControl {
    return this.form.get('price');
  }

  get _category(): AbstractControl {
    return this.form.get('category');
  }

  get _imageUrl(): AbstractControl {
    return this.form.get('imageUrl');
  }
}
