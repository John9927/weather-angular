import { GetDataService } from './../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public service: GetDataService, private router: Router) { }

  response: any;
  coord: any;
  weatherDes: any;
  temperature: any;

  ngOnInit(): void { }


  searchCity = new FormControl('');

  onClickSearch(value: string) {
    this.service.getValueForm(value);
    this.service.auth = true;
    this.router.navigateByUrl('/dashboard');
  }

  search(value: string) {
    this.service.getValueForm(value);
    this.service.auth = true;
    this.router.navigateByUrl('/dashboard');
  }
}
