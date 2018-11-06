import { AbstractControl } from '@angular/forms';

export function justOneName(control: AbstractControl): {[key: string]: any} | null {
    const fullname = control.value.split(' ');
    let result = null;
    if (fullname.length <= 1) {
        result = {'fullname': fullname};
    } else {
      const theSecondName = fullname[1].split('');
      if (theSecondName.length < 1) {

        result = {'fullname': fullname};
      }
    }
    return result;
}