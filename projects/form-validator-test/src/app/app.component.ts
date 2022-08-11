import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NglFormValidatorService } from '../../../ngl-form-validator/src/lib/ngl-form-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public control: FormControl;
  public testForm: FormGroup;
  title = 'form-validator-test';
  constructor(
    private _formBuilder: FormBuilder,
    private _nglFormValidatorService: NglFormValidatorService
  ) {
    this.control = new FormControl('', [Validators.required])
    this.testForm = _formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', [Validators.min(10)]]
    })
  }

  public validateTestForm(): void {
    this._nglFormValidatorService.validateAllFormFields(this.testForm);
  }
}
