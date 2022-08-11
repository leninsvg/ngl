# NglFormValidator

The functionality of that library is to show error of behabior dynamic.

## GitHub

https://github.com/leninsvg/ngl/tree/main/projects/ngl-form-validator

## Demo

https://stackblitz.com/edit/angular-ivy-bbcife?file=src/app/app.component.ts

## Import

Import NglFormValidatorModule
```
 imports: [
    NglFormValidatorModule // Import this module
 ],
```
## directive nglFormValidator

### Properties

formControl - Use as reference to on form control
formControlName - Use as reference to on form control in on group
inputReference - On that part make reference with the HTML input for make that is necesary to pass the input
customErrors - Array in that you can use a custom error message. If don't like to use the predefined messages

### Settings

by default the library has default error messages but that can override and inject our messages

```
const settings: FormValidatorSettings = {
  errorMessages: [{error: 'min', message: 'minimo generico'}],
  defaultErrorMessage: 'xxxxx'
}
@NgModule({
  imports: [
    ...
    NglFormValidatorModule.forRoot(settings),
  ],
})
export class AppModule {

```

### form control
That directive create a binding betwen a reactive form control and other element the element can be div, label, mat-error, ...etc

```
  <input  [formControl]="this.control" type="text" #txtControl>
  <div nglFormValidator [formControl]="control" [inputReference]="txtControl"></div>
  <label nglFormValidator [formControl]="control" [inputReference]="txtControl" [customErrors]="[{error: 'required', message: 'Campo Requerido'}]"></label>
  <button (click)="this.control.updateValueAndValidity()">SetControlValidators</button>
```

### form group
That directive can be work with form control name make a reference with the form group properties

```
<div [formGroup]="testForm">
  <input formControlName="name" type="text" #name>
  <div nglFormValidator formControlName="name" [inputReference]="name"></div>
  <input formControlName="age" type="text" #age>
  <div nglFormValidator formControlName="age" [inputReference]="age"></div>
</div>
<button (click)="this.validateTestForm()">SetGroupValidators</button>
```

### global validator

That functionality is exposed in one service and their functionality is validate all fields on one formGroup, formArray. That works with recursion 

import in to the constructor
```
 private _nglFormValidatorService: NglFormValidatorService
```
call function for validate with form group as parameter
```
 this._nglFormValidatorService.validateAllFormFields(this.testForm);
```
