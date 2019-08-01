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

  isFirstDone = false;
  isSecondDone = false;
  isThirdDone = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleReturn() {
    this.router.navigate([PATH_RACKET]);
  }

  handleFirstPosition() {
    // TODO add request
    this.precision = 20;
    this.isFirstDone = true;
  }

  handleSecondPosition() {
    // TODO add request
    this.precision = 66;
    this.isSecondDone = true;
  }

  handleThirdPosition() {
    // TODO add request
    this.precision = 100;
    this.isThirdDone = true;
  }

  handleDone() {
    this.router.navigate([PATH_RACKET]);
  }

  handleReset() {
    this.precision = 0;
    this.isFirstDone = false;
    this.isSecondDone = false;
    this.isThirdDone = false;
  }
}
