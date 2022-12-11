# NglFormValidator

That helper. Help to show errors messages. That library listen the changes in reactive controls.
And it can be used in some html elements as: inputs, datetime picker, select, autocompletes, text area, etc.

That library help to development process  detect the changes in one html element and then show errors when that is detected.

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

That helper has predefined error messages but that can be override if the user need.

### Properties

#### formControl
Use as reference to on form control

#### formControlName
Use as reference to on form control in on group

#### inputReference
On that part make reference with the HTML input for make that is necessary to pass the input

#### customErrors
Array in that you can use a custom error message. If don't like to use the predefined messages.
For override the error take in consideration the error name. 
For example for Validators.minLength(10) the error is minlength.

### Settings

by default the library has default error messages but that can override and inject our messages

**Preserve default error messages**

```
@NgModule({
  imports: [
    ...
    NglFormValidatorModule,
  ],
})
export class AppModule {

```

**Override the error configuration**

Override error messages.

example: 
```
const settings: FormValidatorSettings = {
  errorMessages: [{error: 'min', message: 'minimo generico'}], // Override the error min as custom message
  defaultErrorMessage: 'xxxxx' // If don't have defined messages for all errors that is a default messages
}
@NgModule({
  imports: [
    ...
    NglFormValidatorModule.forRoot(settings),
  ],
})
export class AppModule {

```

## Usages

That library works with reactive forms.

### form control
That directive create a binding between a reactive form control and html element the error messages can be in a div, label, mat-error, ...etc.

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
