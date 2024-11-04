import { Directive, forwardRef, input, Input } from '@angular/core';
import {
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appDivisor]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => DivisorDirective),
      multi: true,
    },
  ],
})
export class DivisorDirective {
  //@Input('appDivisor')
  //divisor= '1';

  appDivisor = input<number>(1);

  constructor() {}
}
