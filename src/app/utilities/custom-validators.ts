import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static minLengthArray = (min: number) => {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min)
        return null;
  
      return { minLengthArray: true};
    }
  }

  static arrayLengthIsEven = () => {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length % 2 === 0)
        return null;
  
      return { arrayLengthIsEven: false};
    }
  }
}