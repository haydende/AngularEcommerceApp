import {Component, Input, OnInit} from '@angular/core';
import {AppProduct} from '../model/app-product';
import {SnapshotAction} from '@angular/fire/database';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() p: SnapshotAction<AppProduct>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
