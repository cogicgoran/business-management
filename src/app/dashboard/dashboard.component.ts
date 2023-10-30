import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { IBusiness } from '../services/business.interface';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
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
  imports: [RouterModule, CommonModule, MatTableModule, MatButtonModule, MatIconModule, DatePipe, CurrencyPipe]
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
  articlesPerPage = 3;
  totalPages = 1;
  businessesCount = 0;

  constructor(private businessService: BusinessService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.businessService.myBusinessObservable.subscribe((businesses) => {
      this.businessesCount = businesses.length;
      this.totalPages = Math.ceil(this.businessesCount / this.articlesPerPage) || 1;
      if(this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      this.businesses = businesses
        .slice((this.currentPage - 1) * this.articlesPerPage, this.currentPage * this.articlesPerPage)
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
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.articlesPerPage, this.currentPage * this.articlesPerPage)
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
    this.businesses = this.businessService.myBusinesses.value.slice((this.currentPage - 1) * this.articlesPerPage, this.currentPage * this.articlesPerPage)
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
