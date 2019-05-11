import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }
  baseUrl = 'https://holidayapi.pl/v1/holidays'
  getAll(enndpoint, data) {
    return this.http.get(this.baseUrl + '?country=' + enndpoint + '&year=' + data);
  }
}
