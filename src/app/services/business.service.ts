import { Injectable } from '@angular/core';
import { IBusiness, IEmployee } from './business.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  // myBusinesses: Array<IBusiness> = [];
  myBusinesses = new BehaviorSubject<Array<IBusiness>>([]);
  myBusinessObservable = this.myBusinesses.asObservable();
  storageKey = 'businesses';

  constructor(private storageService: StorageService) {
    const businesses = storageService.get<Array<IBusiness>>(this.storageKey) ?? [];
    this.myBusinesses.next(businesses);
  }

  addBusiness(businessData: { businessName: string, businessAddress: string }) {
    const business: IBusiness = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: businessData.businessName,
      address: businessData.businessAddress,
      employees: [],
    }
    const businesses = this.myBusinesses.value;
    const updatedBusinesses = [...businesses, business];
    this.myBusinesses.next(updatedBusinesses);
    this.storageService.save(this.storageKey, updatedBusinesses);
  }

  removeBusiness(businessIdToRemove: IBusiness['id']) {
    const updatedBusinesses = this.myBusinesses.value.filter((business) => { return business.id !== businessIdToRemove })
    this.myBusinesses.next(updatedBusinesses);
    this.storageService.save(this.storageKey, updatedBusinesses);
  }

  getBusiness(businesses: Array<IBusiness>, businessId: string) {
    return businesses.find((business) => { return business.id === businessId })
  }

  addEmployee(businessId: string, employeeData: Omit<IEmployee, 'id'>) {
    const business = this.getBusiness(this.myBusinesses.value, businessId)!;
    if (!business) throw new Error('Error adding employee.'); // Should never come to this case
    const newBusiness = JSON.parse(JSON.stringify(business)) as IBusiness;
    const idx = this.myBusinesses.value.indexOf(business);
    const employee: IEmployee = { ...employeeData, id: Math.floor(Math.random() * 10000).toString() };
    newBusiness.employees = [employee, ...business.employees];
    const updatedBusinesses = [...this.myBusinesses.value];
    const newValue = [
      ...updatedBusinesses.slice(0, idx),
      newBusiness,
      ...updatedBusinesses.slice(idx + 1)
    ]
    this.myBusinesses.next(newValue);
    this.storageService.save(this.storageKey, newValue);
  }

  removeEmployee(businessId: IBusiness['id'], employeeId: IEmployee['id']) {
    const business = this.getBusiness(this.myBusinesses.value ,businessId);
    if (!business) throw new Error('Error removing employee.'); // Should never come to this case
    const newBusiness = JSON.parse(JSON.stringify(business)) as IBusiness;
    const idx = this.myBusinesses.value.indexOf(business);
    newBusiness.employees = business.employees.filter((employee) => { return employee.id !== employeeId })
    const updatedBusinesses = [...this.myBusinesses.value];
    const newValue = [
      ...updatedBusinesses.slice(0, idx),
      newBusiness,
      ...updatedBusinesses.slice(idx + 1)
    ]
    this.myBusinesses.next(newValue);
    this.storageService.save(this.storageKey, newValue);
  }


}
