import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { IBusiness } from '../services/business.interface';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSelectModule, DatePipe, CurrencyPipe]
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'numberOfEmployees', 'delete'];
  businesses!: Array<{
    id: IBusiness['id'];
    name: IBusiness['name'];
    numberOfEmployees: number;
  }>
  subscription!: Subscription;
  currentPage = 1;
  totalPages = 1;
  businessesCount = 0;
  itemCountPerPageOptions = [
    { value: 5, viewValue: '5' },
    { value: 10, viewValue: '10' },
  ];
  itemsPerPage = this.itemCountPerPageOptions[0].value;


  constructor(private businessService: BusinessService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.businessService.myBusinessObservable.subscribe((businesses) => {
      this.businessesCount = businesses.length;
      this.totalPages = Math.ceil(this.businessesCount / this.itemsPerPage) || 1;
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      this.businesses = businesses
        .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        .map((business) => {
          return {
            id: business.id,
            name: business.name,
            numberOfEmployees: business.employees.length
          }
        });
    });
  }

  nextPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.currentPage + 1;
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
  }

  itemsPerPageChangeHandler(value: number) {
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.businessesCount = this.businessService.myBusinesses.value.length;
    this.totalPages = Math.ceil(this.businessesCount / this.itemsPerPage) || 1;
      
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
  }

  prevPage() {
    if (this.currentPage === 1) return;
    this.currentPage = this.currentPage - 1;
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
  }

  firstPage() {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
  }

  lastPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.totalPages;
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleRemoveBusinessClick(businessIdToRemove: IBusiness['id']) {
    this.businessService.removeBusiness(businessIdToRemove);
  }

  viewBusiness(business: IBusiness) {
    this.router.navigate(['business', business.id]);
  }
}
