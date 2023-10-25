import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { CustomValidators } from '../utilities/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class AttendeeFormService {

  private attendees$ = new BehaviorSubject<FormGroup[]>([]);
  private formSubmitted$ = new Subject<any>();

  public attendeeForm: FormGroup;
  public valid$: Observable<boolean>;


  get formSubmitted(): Observable<boolean> {
    return this.formSubmitted$.asObservable();
  }

  private get attendeesArray(): FormArray {
    return <FormArray>this.attendeeForm.get('attendees');
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.attendeeForm = this.fb.group({
      attendees: this.fb.array(
        [], 
        [CustomValidators.minLengthArray(1), 
         CustomValidators.arrayLengthIsEven])
    });

    this.valid$ = this.attendeeForm.statusChanges.pipe(
      map(status => status === 'VALID')
    );
  }

  private addAttendeeGroup() : FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      preferredGifts: [null]
    });
  }

  public submit() {
    if(this.attendeeForm.valid) {
      this.formSubmitted$.next(this.attendeeForm.value.attendees);
    }
  }

  public get(): Observable<FormGroup[]> {
    return this.attendees$.asObservable();
  }

  public add() {
    this.attendeesArray.push(this.addAttendeeGroup());
    this.attendees$.next(<FormGroup[]>this.attendeesArray.controls);
  }

  public remove(index: number) {
    this.attendeesArray.removeAt(index);
    this.attendees$.next(<FormGroup[]>this.attendeesArray.controls);
  }
}
