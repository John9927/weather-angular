import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  templateUrl: './google-maps.component.html',
  selector: 'app-google-maps',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('gmap', { static: true }) gmapElement: ElementRef;
  map: google.maps.Map;
  constructor(private service: GetDataService) { }

  ngOnInit() {
      var mapProp = {
        center: new google.maps.LatLng(this.service.coordLat, this.service.coordLon),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
