import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BusinessService } from '../services/business.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBusiness, IEmployee } from '../services/business.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule]
})
export class AddEmployeeComponent {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    dateOfBirth: new FormControl<Date>(null!, { validators: [Validators.required, validateDate()] }),
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

function validateDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
    // return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}