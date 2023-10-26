import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBusiness } from '../services/business.interface';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, DatePipe, CurrencyPipe,MatNativeDateModule, MatDatepickerModule],
  providers: [MatDatepickerModule]
})
export class BusinessComponent implements OnInit, OnDestroy {
  urlBusinessId!: string;
  routerSubscription!: Subscription;
  displayedColumns = ['name', 'dateOfBirth', 'role', 'phone', 'salary'];
  business: IBusiness | undefined;
  showAddEmployeeForm = false;

  constructor(private businessService: BusinessService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.business = this.businessService.getBusiness(paramMap.get('businessId')!)
    });
  }

  openAddEmployeeForm() {
      this.dialog.open(AddEmployeeComponent, {
        height: '500px',
        width: '400px',
        data: this.business
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}