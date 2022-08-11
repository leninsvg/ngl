import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ValidatorErrorModel } from '../models/validator-error.model';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from '../form-validator.settings';
import { NglFormValidatorService } from '../ngl-form-validator.service';

const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {
  },
  registerOnChange(): void {
  },
  registerOnTouched(): void {
  }
};

@Directive({
  selector: '[nglFormValidator]'
})
export class FormValidatorDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input()
  public inputReference: HTMLElement | undefined;
  @Input()
  public customErrors: ValidatorErrorModel[];
  private _errorMessages: any;
  private _abstractControlSubscription: Subscription | undefined;

  constructor(
    private _el: ElementRef,
    private _nglFormValidatorService: NglFormValidatorService,
    @Optional()
    public ngControl: NgControl
  ) {
    this.customErrors = [];
    this.initErrorMessages();
    if (this.ngControl) {
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customErrors']?.currentValue) {
      this.initErrorMessages();
    }
  }


  ngOnInit(): void {
    this.initHandlers();
  }

  ngAfterViewInit(): void {
    this.inputReference?.addEventListener('focus', () => {
      this.validateForm();
    });
  }

  ngOnDestroy(): void {
    if (this._abstractControlSubscription) {
      this._abstractControlSubscription.unsubscribe();
    }
  }

  private initHandlers(): void {
    this._el.nativeElement.textContent = '';
    if (!this.ngControl) {
      return;
    }
    this._abstractControlSubscription = this.ngControl.statusChanges?.subscribe(() => this.validateForm());
  }

  private validateForm(): void {
    if (!this.ngControl) {
      return;
    }
    this._el.nativeElement.textContent = '';
    for (const keyError in this.ngControl.errors) {
      if (!this._errorMessages[keyError]) {
        console.log('Please add custom error for:' + keyError);
        this._el.nativeElement.textContent = this._nglFormValidatorService.formValidatorSettings?.defaultErrorMessage || DEFAULT_ERROR_MESSAGE;
        break;
      }
      this._el.nativeElement.textContent = this._errorMessages[keyError].message;
    }
  }

  private initErrorMessages(): void {
    this._errorMessages = {};
    const errorMessages = this._nglFormValidatorService.formValidatorSettings?.errorMessages || ERROR_MESSAGES;
    for (const error of errorMessages) {
      this._errorMessages[error.error] = {...error};
    }
    if (this.customErrors) {
      for (const error of this.customErrors) {
        this._errorMessages[error.error] = {...error};
      }
    }
  }
}
