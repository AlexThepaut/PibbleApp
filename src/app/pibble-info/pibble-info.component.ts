import { Component, OnInit } from '@angular/core';
import { VERSION } from '../app.constantes';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-pibble-info',
  templateUrl: './pibble-info.component.html',
  styleUrls: ['./pibble-info.component.css']
})
export class PibbleInfoComponent implements OnInit {

  appVersion = VERSION
  firmwareVersion = [];
  contributors = [];

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getInfos().subscribe(data => {
      this.firmwareVersion = data.version;
      this.contributors = data.contributors;
    });
  }

}
