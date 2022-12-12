import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEmailValidator } from './app-email-validator';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppEmailDirective,
      multi: true
    }
  ]
})
export class AppEmailDirective implements OnChanges, Validator {

  @Input() appEmailValidator: string[] = [];

  validator: ValidatorFn = () => null;

  constructor() { }

  ngOnChanges(): void {
    this.validator = appEmailValidator();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }
}