import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min)
        return null;
  
      return { MinLengthArray: true};
    }
  }
}