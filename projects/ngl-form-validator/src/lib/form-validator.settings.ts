import { ValidatorErrorModel } from './models/validator-error.model';

export interface FormValidatorSettings {
  defaultErrorMessage: string;
  errorMessages: ValidatorErrorModel[];
  printNoDefinedErrors?: boolean;
}
export const DEFAULT_ERROR_MESSAGE = 'Invalid value';
export const ERROR_MESSAGES: ValidatorErrorModel[] = [
  {
    error: 'required',
    message: 'Required field'
  },
  {
    error: 'minlength',
    message: 'Invalid length'
  },
  {
    error: 'maxlength',
    message: 'Invalid length'
  },
  {
    error: 'email',
    message: 'Invalid length'
  },
  {
    error: 'phone',
    message: 'Invalid length'
  },
  {
    error: 'number',
    message: 'Invalid length'
  },
  {
    error: 'pattern',
    message: 'Invalid length'
  },
];
