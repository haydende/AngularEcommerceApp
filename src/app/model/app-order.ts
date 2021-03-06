import {OrderItem} from './OrderItem';

export class AppOrder {
  key?: string;
  name: string;
  address: string;
  city: string;
  date: number;
  items: OrderItem[];
  public readonly user: string; // use the key of the user

  constructor(order: any, key?: string) {
    this.key = key || null;
    this.name = order.name;
    this.address = order.address;
    this.city = order.city;
    this.date = order.date || new Date().getTime();
    this.user = order.user;
    this.items = order.items || [];
  }
}
