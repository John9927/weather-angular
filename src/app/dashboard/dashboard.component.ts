import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  response: any;
  coord: any;
  weatherIcon: any;
  weatherDesc: any;
  temperature: any;
  time: number;

  constructor(public service: GetDataService) { }

  ngOnInit(): void {
    this.service.spinner = true;
    this.service.insertCity = false;
    this.service.getCity().subscribe(res => {
      this.response = res;
      console.log("Response:", this.response);
      this.coord = this.response.coord;
      let urlWeather = "http://openweathermap.org/img/wn/"
      this.weatherIcon = urlWeather + this.response.weather[0].icon + ".png";
      this.temperature = this.response.main.temp;
      this.weatherDesc = this.response.weather[0].description;
      // this.time = this.response.timezone;
      setTimeout(() => {
        this.service.insertCity = true;
        this.service.spinner = false;
      }, 500)
    });
  }

  onClickSearch(value: string) {

    this.service.getValueForm(value);



  }

}
