import {stringify} from 'querystring';

export class AppOrder {
  key?: string;
  name: string;
  address: string;
  city: string;
  date: Date;
  user: string; // use the key of the user

  constructor(order: any, key?: string) {
    this.key = key || null;
    this.name = order.name;
    this.address = order.address;
    this.city = order.city;
    this.date = order.date;
    this.user = order.user;
  }
}
