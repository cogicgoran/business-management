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

  constructor(private businessService: BusinessService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.businessService.myBusinessObservable.subscribe((businesses) => {
      this.businesses = businesses.map((business) => {
        return {
          id: business.id,
          name: business.name,
          numberOfEmployees: business.employees.length
        }
      });
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
