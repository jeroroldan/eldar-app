import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function minLengthAsyncValidator(minLength: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      map((value) => {
        if (value && value.length < minLength) {
          return {
            minLength: {
              requiredLength: minLength,
              actualLength: value.length,
            },
          };
        }
        return null;
      })
    );
  };
}
