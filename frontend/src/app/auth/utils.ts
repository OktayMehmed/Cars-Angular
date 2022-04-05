import { AbstractControl, ValidatorFn } from "@angular/forms";


export function passwordMatch(passwordFormControl: AbstractControl) {
  const validatorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePasswordFormControl.value) {
      return { passwordMissMatch: true }
    }
    return null
  }

  return validatorFn
}