import { Inject, Injectable, Optional } from '@angular/core';
import { FormValidatorSettings } from './form-validator.settings';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NglFormValidatorService {

  constructor(
    @Optional() @Inject('FORM_VALIDATOR_SETTINGS')
    public formValidatorSettings: FormValidatorSettings) {
  }

  public validateAllFormFields(abstractControl: AbstractControl): void {
    if (abstractControl instanceof FormControl) {
      abstractControl.markAsTouched();
      abstractControl.updateValueAndValidity();
      return;
    }
    for (const field in (abstractControl as FormGroup).controls) {
      const control = abstractControl.get(field);
      if (!(control instanceof FormControl)) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else if (control instanceof FormArray) {
          for (const auxControl of control.controls) {
            if (auxControl instanceof FormControl) {
              control.updateValueAndValidity();
            } else if (auxControl instanceof FormGroup) {
              this.validateAllFormFields(auxControl);
            }
          }
        }
      } else {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    }
  }
}
