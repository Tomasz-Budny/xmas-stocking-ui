import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public submitBtnEnabled = new BehaviorSubject<boolean>(false);

  constructor() { }


}
