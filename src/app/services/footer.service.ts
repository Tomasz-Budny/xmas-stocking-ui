import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public submitBtnEnabled$ = new BehaviorSubject<boolean>(false);
  public numberOfAttendees$ = new Subject<number>(); 
  public formSubmitted$: Subject<void> = new Subject<void>()

  constructor() { }

}
