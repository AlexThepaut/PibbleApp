import { Component, OnInit } from '@angular/core';
import { CONTRIBUTORS, VERSION } from '../app.constantes';

@Component({
  selector: 'app-pibble-info',
  templateUrl: './pibble-info.component.html',
  styleUrls: ['./pibble-info.component.css']
})
export class PibbleInfoComponent implements OnInit {

  contributors = CONTRIBUTORS;
  appVersion = VERSION

  constructor() { }

  ngOnInit() {
  }

}
