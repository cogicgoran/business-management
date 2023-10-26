import { Component } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { IBusiness } from '../services/business.interface';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, MatButtonModule, DatePipe, CurrencyPipe]
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'name', 'numberOfEmployees'];
  businesses: Array<{
    id: IBusiness['id'];
    name: IBusiness['name'];
    numberOfEmployees: number;
  }>

  constructor(private businessService: BusinessService, private router: Router) {
    this.businesses = this.businessService.myBusinesses.map((business) => {
      return {
        id: business.id,
        name: business.name,
        numberOfEmployees: business.employees.length
      }
    });
  }

  viewBusiness(business: IBusiness) {
    this.router.navigate(['business', business.id]);
  }
}
