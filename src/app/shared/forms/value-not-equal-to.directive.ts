import { ValidatorFn, AbstractControl } from '@angular/forms';

export function valueNotEqualTo(match: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = match != control.value
    return valid ? null : {'valueNotEqualTo': {value: control.value}}
  };
}