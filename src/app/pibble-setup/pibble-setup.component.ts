import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';

@Component({
  selector: 'app-pibble-setup',
  templateUrl: './pibble-setup.component.html',
  styleUrls: ['./pibble-setup.component.css']
})
export class PibbleSetupComponent implements OnInit {

  precision = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleReturn() {
    this.router.navigate([PATH_RACKET]);
  }

  handleFirstPosition() {
    // TODO add request
    this.precision = 20;
  }

  handleSecondPosition() {
    // TODO add request
    this.precision = 66;
  }

  handleThirdPosition() {
    // TODO add request
    this.precision = 100;
  }
}
