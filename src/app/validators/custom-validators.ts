import { AbstractControl, ValidationErrors } from "@angular/forms";
import { isValid } from 'date-fns';

export class CustomValidators {
    static dateValidator(control: AbstractControl<any, any>): ValidationErrors | null {
        if (control.value === null) return { required: 'Field required' };
        return isValid(control.value) ? null : { invalidDate: 'Invalid Date' };
    }
}
