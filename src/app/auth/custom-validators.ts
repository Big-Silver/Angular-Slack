import {AbstractControl} from '@angular/forms';
export class CustomValidators {
  static matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirm').value;

    if(password != confirmPassword) {
      AC.get('confirm').setErrors( {matchpassword: true} )
    } else {
      return null
    }
  }

  static passwordStrength(AC: AbstractControl) {
    let password = AC.get('password').value;

    const letter = /[A-Za-z]+/g;
    const number = /\d+/g;
    const special = /[!@#$%^&*()\[\]{}<>\/]/g;

    if (!(letter.exec(password) &&  number.exec(password) && special.exec(password))) {
      AC.get('password').setErrors({passwordStrength: true});
    }
    return null;
  }
}
