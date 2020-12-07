import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  get categories$(): Observable<any> {
    console.log('Getting categories');
    return this.categoryService.getCategories().valueChanges();
  }

}
