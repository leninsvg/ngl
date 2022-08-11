import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NglFormValidatorModule } from '../../../ngl-form-validator/src/lib/ngl-form-validator.module';
import { FormValidatorSettings } from '../../../ngl-form-validator/src/lib/form-validator.settings';
const settings: FormValidatorSettings = {
  errorMessages: [{error: 'min', message: 'minimo generico'}],
  defaultErrorMessage: 'xxxxx'
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NglFormValidatorModule.forRoot(settings),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
