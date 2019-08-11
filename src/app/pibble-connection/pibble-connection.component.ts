import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_SETUP } from '../app.constantes';
import { GeolocalisationService } from '../services/geolocalisation.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-pibble-connection',
  templateUrl: './pibble-connection.component.html',
  styleUrls: ['./pibble-connection.component.css']
})
export class PibbleConnectionComponent implements OnInit {

  isConnected = false;
  isRequestBack = false;
  isError = false;

  constructor(private router: Router, private geolocation: GeolocalisationService, private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.connection();
  }

  handleSubmit() {
    this.router.navigate([PATH_SETUP]);
  }

  handleRetry() {
    this.isRequestBack = false;
    this.isError = false;
    this.connection();
  }

  connection() {
    this.geolocation.getCurrentPosition().subscribe(
      data => {
        var now = new Date;
        var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
          now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

        this.connectionService.getConnection(data.coords.latitude, data.coords.longitude, utc_timestamp).subscribe(() => {
          this.isConnected = true;
          this.isRequestBack = true;
        },
          error => {
            this.isError = true;
            this.isRequestBack = true;
            console.log(error);
          })
      }
    );
  }

}
