import { Injectable, OnInit } from '@angular/core';
import { IBusiness, IEmployee } from './business.interface';
import { DUMMY_BUSINESSES } from 'src/temp/data';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  myBusinesses: Array<IBusiness> = [];

  constructor() {
    console.log('halo')
    const businessesStringified = window.localStorage.getItem('businesses')
    console.log(businessesStringified);
    this.myBusinesses = businessesStringified ? JSON.parse(businessesStringified) : [];
   }

  addBusiness(businessData: { businessName: string, businessAddress: string }) {
    const business: IBusiness = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: businessData.businessName,
      address: businessData.businessAddress,
      employees: [],
    }
    this.myBusinesses = [...this.myBusinesses, business];
    this.saveToStorage();
  }

  getBusiness(businessId: string) {
    return this.myBusinesses.find((business) => { return business.id === businessId })
  }

  addEmployee(businessId: string, employeeData: IEmployee) {
    const business = this.getBusiness(businessId);
    if (!business) throw new Error('Error adding employee.'); // Should never come to this case
    business.employees = [employeeData, ...business.employees]
    this.saveToStorage();
  }

  saveToStorage() {
    window.localStorage.setItem('businesses', JSON.stringify(this.myBusinesses))
  }
}
