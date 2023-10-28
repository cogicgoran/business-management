import { Injectable } from '@angular/core';
import { IBusiness, IEmployee } from './business.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  myBusinesses: Array<IBusiness> = [];

  constructor() {
    const businessesStringified = window.localStorage.getItem('businesses')
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

  addEmployee(businessId: string, employeeData: Omit<IEmployee, 'id'>) {
    const business = this.getBusiness(businessId);
    if (!business) throw new Error('Error adding employee.'); // Should never come to this case
    const employee: IEmployee = { ...employeeData, id: Math.floor(Math.random() * 10000).toString() }
    business.employees = [employee, ...business.employees]
    this.saveToStorage();
  }

  removeEmployee(businessId: IBusiness['id'], employeeId: IEmployee['id']) {
    const business = this.getBusiness(businessId);
    if (!business) throw new Error('Error removing employee.'); // Should never come to this case
    business.employees = business.employees.filter((employee) => { return employee.id !== employeeId })
    this.saveToStorage()
  }

  saveToStorage() {
    window.localStorage.setItem('businesses', JSON.stringify(this.myBusinesses))
  }
}
