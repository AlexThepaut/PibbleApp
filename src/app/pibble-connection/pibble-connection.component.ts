import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';
import { GeolocalisationService } from '../services/geolocalisation.service';

@Component({
  selector: 'app-pibble-connection',
  templateUrl: './pibble-connection.component.html',
  styleUrls: ['./pibble-connection.component.css']
})
export class PibbleConnectionComponent implements OnInit {

  constructor(private router: Router, private geolocation: GeolocalisationService) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.geolocation.getCurrentPosition().subscribe(
      data => {
        console.log(data);
      }
    )
    this.router.navigate([PATH_RACKET]);
  }

}
