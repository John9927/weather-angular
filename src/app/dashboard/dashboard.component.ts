import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { } from "googlemaps";
import { Router } from '@angular/router';
import fromUnixTime from 'date-fns/fromUnixTime';
import { intlFormat } from 'date-fns';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  response: any;
  coordLon: number;
  coordLat: number;
  weatherIcon: any;
  weatherDesc: any;
  temperature: any;
  wind: any;
  sunrise: any;
  sunset: any;
  tempMax: any;
  tempMin: any;
  cityError = false;
  arrowLeftMobile = false;
  constructor(public service: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.service.spinner = true;
    this.service.insertCity = false;
    this.service.getCity().subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.service.auth = true;
      this.service.coordLon = this.response.coord.lon;
      this.service.coordLat = this.response.coord.lat;
      let urlWeather = "http://openweathermap.org/img/wn/"
      this.weatherIcon = urlWeather + this.response.weather[0].icon + ".png";
      this.temperature = this.response.main.temp;
      this.weatherDesc = this.response.weather[0].description;
      this.wind = this.response.wind.speed;
      this.tempMax = this.response.main.temp_max;
      this.tempMin = this.response.main.temp_min;
      this.sunset = fromUnixTime(this.response.sys.sunset);
      this.sunrise = fromUnixTime(this.response.sys.sunrise);

      setTimeout(() => {
        this.service.insertCity = true;
        this.service.spinner = false;
      }, 500)
    }, err => {
      this.cityError = true;
      this.service.spinner = false;
      setTimeout(() => {
        window.location.reload();
      }, 5000)
    });
  }

  onClickError() {
    window.location.reload();
  }

  onClickSearch(value: string) {
    this.service.getValueForm(value);
  }

  onClickArrow() {
    this.router.navigateByUrl('')
  }

}
