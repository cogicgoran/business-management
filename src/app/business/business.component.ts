import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBusiness, IEmployee } from '../services/business.interface';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, DatePipe, CurrencyPipe, MatNativeDateModule, MatDatepickerModule],
  providers: [MatDatepickerModule]
})
export class BusinessComponent implements OnInit, OnDestroy {
  urlBusinessId!: string;
  routerSubscription!: Subscription;
  displayedColumns = ['name', 'dateOfBirth', 'role', 'phone', 'salary', 'delete'];
  business: IBusiness | undefined;
  showAddEmployeeForm = false;
  businessesSubscription!: Subscription;
  businessId: string | null = null;
  currentPage = 1;
  itemCountPerPageOptions = [
    { value: 5, viewValue: '5' },
    { value: 10, viewValue: '10' },
  ];
  itemsPerPage = this.itemCountPerPageOptions[0].value;
  employeeCount = 0;
  totalPages = 1;
  employees: Array<IEmployee> = [];

  constructor(private businessService: BusinessService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.businessId = paramMap.get('businessId');
    });
    this.businessesSubscription = this.businessService.myBusinessObservable.subscribe((data) => {
      this.business = this.businessService.getBusiness(data, this.businessId!);
      this.employeeCount = this.business?.employees.length ?? 0;
      this.totalPages = Math.ceil(this.employeeCount / this.itemsPerPage) || 1;
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      this.employees = this.business?.employees
        .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
    })
  }

  firstPage() {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.employees = this.business?.employees
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
  }

  lastPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.totalPages;
    this.employees = this.business?.employees
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
  }

  prevPage() {
    if (this.currentPage === 1) return;
    this.currentPage = this.currentPage - 1;
    this.employees = this.business?.employees
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
  }

  nextPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.currentPage + 1;
    this.employees = this.business?.employees
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
  }

  itemsPerPageChangeHandler(value: number) {
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.employeeCount = this.business?.employees.length ?? 0;
    this.totalPages = Math.ceil(this.employeeCount / this.itemsPerPage) || 1;
    this.employees = this.business?.employees
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage) ?? []
  }

  openAddEmployeeForm() {
    this.dialog.open(AddEmployeeComponent, {
      data: this.business
    });
  }

  removeEmployee(businessId: IBusiness['id'], employeeId: IEmployee['id']) {
    this.businessService.removeEmployee(businessId, employeeId);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.businessesSubscription.unsubscribe();
  }
}
