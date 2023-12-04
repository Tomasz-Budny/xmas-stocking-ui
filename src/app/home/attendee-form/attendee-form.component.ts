import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EMPTY, Observable, catchError, switchMap, tap } from 'rxjs';
import { AttendeeFormService } from 'src/app/services/attendee-form.service';
import { DrawApiService } from 'src/app/services/draw-api.service';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss'],
})
export class AttendeeFormComponent {

  public loading: boolean = false;
  public emailsDelivered: boolean = false;
  public errorOccured: boolean = false;

  public attendees$: Observable<FormGroup[]>;

  constructor(
    public attendeeFormService: AttendeeFormService,
    public drawApiService: DrawApiService
  ) {
    this.attendees$ = this.attendeeFormService.get();

    this.attendeeFormService.formSubmitted
    .pipe(
      tap(_ => this.loading = true),
      switchMap(data => this.drawApiService.drawGiftPresenters(data)
      .pipe(
        tap({ 
          next: _ => this.emailsDelivered = true,
          error: _ =>  this.errorOccured = true
        }),
        catchError(_ => EMPTY ),
        tap({ complete: () =>  this.loading = false})
      ))
    ).subscribe()
  }

  removeAttendee(index: number) {
    this.attendeeFormService.remove(index);
  }

  addAttendee() {
    this.attendeeFormService.add();
  }
}
