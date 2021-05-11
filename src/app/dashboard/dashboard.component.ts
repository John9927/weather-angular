import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { } from "googlemaps";
import { Router } from '@angular/router';
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
  constructor(public service: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.service.spinner = true;
    this.service.insertCity = false;
    this.service.getCity().subscribe(res => {
      this.response = res;
      this.service.auth = true;
      this.service.coordLon = this.response.coord.lon;
      this.service.coordLat = this.response.coord.lat;
      let urlWeather = "http://openweathermap.org/img/wn/"
      this.weatherIcon = urlWeather + this.response.weather[0].icon + ".png";
      this.temperature = this.response.main.temp;
      this.weatherDesc = this.response.weather[0].description;
      this.wind = this.response.wind.speed;
      this.sunrise = this.response.sys.sunrise;
      this.sunset = this.response.sys.sunset;

      setTimeout(() => {
        this.service.insertCity = true;
        this.service.spinner = false;
      }, 500)
    });
  }

  onClickSearch(value: string) {
    this.service.getValueForm(value);
  }

  onClickArrow() {
    this.router.navigateByUrl('')
  }

}
