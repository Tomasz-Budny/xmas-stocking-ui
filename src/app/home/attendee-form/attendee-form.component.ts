import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { DrawApiService } from 'src/app/services/draw-api.service';
import { FooterService } from 'src/app/services/footer.service';
import { CustomValidators } from 'src/app/utilities/custom-validators';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendeeFormComponent implements AfterViewInit, OnDestroy {

  public attendeeForm: FormGroup;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    public footerService: FooterService,
    public drawApiService: DrawApiService,
    private fb: FormBuilder
  ) {
    this.attendeeForm = this.fb.group({
      attendees: this.fb.array(
        [this.addAttendeeGroup(), this.addAttendeeGroup()], 
        [CustomValidators.minLengthArray(1), 
         CustomValidators.arrayLengthIsEven()])
    })
  }

  private addAttendeeGroup() : FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit(): void {
    this.attendeeForm.statusChanges.pipe(
      tap(status => {
        const isValid = status === 'VALID';
        this.footerService.submitBtnEnabled.next(isValid);
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    this.footerService.formSubmitted
    .subscribe(_ => {
      this.submit();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  addAttendee() : void {
    this.attendeesArray.push(this.addAttendeeGroup());
  }

  removeAttendee(index: number) : void {
    this.attendeesArray.removeAt(index);
  }

  private submit() : void {
    if(this.attendeeForm.valid) {
      const value = this.attendeeForm.value.attendees;
      console.log(value);
      this.drawApiService.drawGiftPresenters(value)
        .subscribe(res => {
          console.log(res);
        })
    }
  }

  get attendeesArray(): FormArray {
    return <FormArray>this.attendeeForm.get('attendees');
  }
}
