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

  constructor(private router: Router, private geolocation: GeolocalisationService, private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().subscribe(
      data => {
        console.log(data);
        this.connectionService.getConnection(data.coords.latitude, data.coords.longitude, data.timestamp).subscribe(() => {
          this.isConnected = false;
        },
        error => {
          console.log(error);
        })
      }
    )
  }

  handleSubmit() {
    this.router.navigate([PATH_SETUP]);
  }

}
