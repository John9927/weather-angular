import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  API = "877dc68670f0a9c804399e227bd3b8e3";
  url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  valueCity: any;
  lang = "it";
  spinner = false;
  insertCity = true;

  constructor(private http: HttpClient) { }

  getValueForm(valuesCity: string) {
    this.valueCity = valuesCity;
  }

  getCity() {
    return this.http.get(`${this.url}${this.valueCity}&appid=${this.API}&units=metric&lang=${this.lang}`)
  }
}
