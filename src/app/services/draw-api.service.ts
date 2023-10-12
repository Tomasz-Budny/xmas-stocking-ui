import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawApiService {

  URL = 'https://localhost:7163/api/drawn' 

  constructor(
    private http: HttpClient
  ) { }

  drawGiftPresenters(attendees) {
    return this.http.post(this.URL, attendees);
  }
}
