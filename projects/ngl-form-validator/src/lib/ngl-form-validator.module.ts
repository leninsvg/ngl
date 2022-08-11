import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormValidatorDirective } from './directives/form-validator.directive';
import { FormValidatorSettings } from './form-validator.settings';
import { NglFormValidatorService } from './ngl-form-validator.service';


@NgModule({
  declarations: [
    FormValidatorDirective
  ],
  imports: [],
  exports: [
    FormValidatorDirective
  ]
})
export class NglFormValidatorModule {
  static forRoot(formValidatorSettings?: FormValidatorSettings): ModuleWithProviders<NglFormValidatorModule> {
    return {
      ngModule: NglFormValidatorModule,
      providers: [
        NglFormValidatorService,
        {
          provide: 'FORM_VALIDATOR_SETTINGS',
          useValue: formValidatorSettings
        }
      ]
    };
  }
}
