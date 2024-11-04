import { Directive, forwardRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appTaken]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => TakenDirective),
      multi: true,
    },
  ],
})
export class TakenDirective implements AsyncValidator {
  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const valor = control.value;
    if (valor === 'juan') {
      return { taken: true };
    }
    return null;
  }
  //Si hay error tenemos que retornar taken:true, si no hay error tenemos que retornar null.
  constructor() {}
}
