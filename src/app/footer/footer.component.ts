import { Component } from '@angular/core';
import { AttendeeFormService } from '../services/attendee-form.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public attendeesNumber$: Observable<number>;

  constructor(
    public attendeeFormService: AttendeeFormService
  ) {
    this.attendeesNumber$ = attendeeFormService.get()
    .pipe(
      map(attendees => attendees.length)
    );
  }
}
