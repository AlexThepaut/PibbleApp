import { Component, OnInit } from '@angular/core';
import { VERSION, PATH_HOME } from '../app.constantes';
import { SetupService } from '../services/setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pibble-info',
  templateUrl: './pibble-info.component.html',
  styleUrls: ['./pibble-info.component.css']
})
export class PibbleInfoComponent implements OnInit {

  appVersion = VERSION
  firmwareVersion = [];
  contributors = [];

  constructor(private setupService: SetupService, private route: Router) { }

  ngOnInit() {
    this.setupService.getInfos().subscribe(data => {
      this.firmwareVersion = data.version;
      this.contributors = data.contributors;
    });
  }

  handleDisconnect() {
    this.setupService.getResetSetup();
    this.route.navigate([PATH_HOME]);
  }
}
