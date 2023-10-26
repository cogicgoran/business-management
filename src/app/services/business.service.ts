import { Injectable } from '@angular/core';
import { IBusiness } from './business.interface';
import { DUMMY_BUSINESSES } from 'src/temp/data';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  myBusinesses: Array<IBusiness> = DUMMY_BUSINESSES;

  constructor() { }

  addBusiness(businessData: { businessName: string, businessAddress: string }) {
    const business: IBusiness = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: businessData.businessName,
      address: businessData.businessAddress,
      employees: [],
    }
    this.myBusinesses = [...this.myBusinesses, business];
  }
}
