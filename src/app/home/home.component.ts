import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppBreakpoints } from '../utilities/app-breakpoints';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public contentVisible$: Observable<boolean>;

  constructor(
    private responsive: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.contentVisible$ = this.responsive.observe([AppBreakpoints.Phone])
      .pipe(
        map(result => result.matches)
    )
  }
}
