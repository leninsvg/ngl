# NglFormValidator

The functionality of that library is to show errors messages, that library listed the changes in the control and in the html element.
That library works whit any html element for example: inputs, datetime picker, select, autocompletes, text area, etc.

That library help to development process when we work with errors because detect the changes and show errors when a change is detected 
for example when make a change in the ts or in the html.

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

If don't have defined an error message for one error the default error message 
is set and the no defined error is printed in console. 
That is only for identified how error is missed to set in the configurations

### Properties

#### formControl
Use as reference to on form control

#### formControlName
Use as reference to on form control in on group

#### inputReference
On that part make reference with the HTML input for make that is necesary to pass the input

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

The settings has a FormValidatorSettings the next properties

```
// default error messages for each validator in that part you can configure 
// own validators or any on need the name
errorMessages array of errors
    - error // the name of the error for example: required, minlength, maxlength, min
    - message // the default message for that error. for example: invalid length
// if don't have a error message for a specific validator that value is showed
defaultErrorMessage
```
example: 
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
