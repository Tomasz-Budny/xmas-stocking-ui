import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawApiService {

  URL = 'https://xmas-stocking-api.azurewebsites.net/api/draw'; 

  constructor(
    private http: HttpClient
  ) { }

  drawGiftPresenters(attendees) {
    return this.http.post(this.URL, attendees);
  }
}
