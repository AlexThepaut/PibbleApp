import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';
import { GeolocalisationService } from '../services/geolocalisation.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-pibble-connection',
  templateUrl: './pibble-connection.component.html',
  styleUrls: ['./pibble-connection.component.css']
})
export class PibbleConnectionComponent implements OnInit {

  isConnected = false;
  isRequestBack = true;
  isError = false;

  latitude: number;
  longitude: number;

  constructor(private router: Router, private geolocation: GeolocalisationService, private connectionService: ConnectionService) {
  }

  ngOnInit() {}

  handleRetry() {
    this.isRequestBack = false;
    this.isError = false;
    this.connection();
  }

  connection() {
    let timestamp = new Date().getTime();
    let timezoneOffset = new Date().getTimezoneOffset() / 60;
    console.log(this.latitude, this.longitude, timestamp, timezoneOffset);
    this.connectionService.getConnection(this.latitude, this.longitude, timestamp, timezoneOffset).subscribe(() => {
      this.isConnected = true;
      this.isRequestBack = true;
      this.router.navigate([PATH_RACKET]);
    },
      error => {
        this.isError = true;
        this.isRequestBack = true;
        console.error(error);
      });
  }
}
