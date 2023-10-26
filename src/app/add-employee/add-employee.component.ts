import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BusinessService } from '../services/business.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBusiness, IEmployee } from '../services/business.interface';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule]
})
export class AddEmployeeComponent {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    dateOfBirth: new FormControl<Date>(null!, { validators: [Validators.required] }),
    role: new FormControl('', { validators: [Validators.required] }),
    phoneNumber: new FormControl('', { validators: [Validators.required] }),
    salary: new FormControl(0, { validators: [Validators.required] }),
  })

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public business: IBusiness,
    private businessService: BusinessService
  ) { }

  addEmployee() {
    if (this.form.invalid) return;
    this.businessService.addEmployee(this.business.id, this.form.value as IEmployee);
    this.dialogRef.close();
  }
}
