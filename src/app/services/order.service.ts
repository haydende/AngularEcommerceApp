import {Injectable} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppOrder} from '../model/app-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll(): Observable<AppOrder[]> {
    return this.db.list(`/orders/`)
      .snapshotChanges()
      .pipe(map((value: SnapshotAction<any>[]) => {
        const orderArray = [];
        for (const v of value) {
          if (v.key === 'placeholder') {
            continue;
          }
          const key = v.key;
          const order = key ? v.payload.val() : {};
          orderArray.push(new AppOrder(order, key));
        }
        return orderArray;
      }));
  }

  save(order: AppOrder): void {
    this.db.list(`/orders/`).push({
      name: order.name,
      address: order.address,
      city: order.city,
      date: order.date || new Date(),
      user: order.user
    });
  }
}

