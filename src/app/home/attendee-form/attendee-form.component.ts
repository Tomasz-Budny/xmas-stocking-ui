import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendeeFormComponent {

  public attendeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.attendeeForm = this.fb.group({
      attendees: this.fb.array([this.addAttendeeGroup()])
    })
  }

  private addAttendeeGroup() : FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  addAttendee() : void {
    this.attendeesArray.push(this.addAttendeeGroup());
  }

  removeAttendee(index: number) : void {
    this.attendeesArray.removeAt(index);
  }

  submit() : void {
    if(this.attendeeForm.valid) {
      const value = this.attendeeForm.value;
      console.log(value);
    }
  }

  get attendeesArray(): FormArray {
    return <FormArray>this.attendeeForm.get('attendees');
  }
}
