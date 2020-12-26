import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {

  orderSubscription: Subscription;

  constructor(private orderService: OrderService) {}


  ngOnInit(): void {
    this.orderSubscription = this.orderService.getAll().subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
