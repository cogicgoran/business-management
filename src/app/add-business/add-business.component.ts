import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../services/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule]
})
export class AddBusinessComponent {
  form = new FormGroup({
    businessName: new FormControl('', { validators: [Validators.required] }),
    businessAddress: new FormControl('', { validators: [Validators.required] })
  })

  constructor(private businessService: BusinessService, private router: Router) { }

  addBusiness() {
    if (this.form.invalid) return;
    this.businessService.addBusiness({
      businessName: this.form.controls.businessName.value!,
      businessAddress: this.form.controls.businessAddress.value!,
    });
    this.router.navigate(['/'])
  }
}
