import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';
import { SetupService } from '../services/setup.service';

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

  secondStar = '';
  thirdStar = '';

  starSelect = [];

  constructor(private router: Router, private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getInitSetup().subscribe(data => {
      console.log(data)
      this.starSelect = data;
    });
  }

  handleReturn() {
    this.router.navigate([PATH_RACKET]);
  }

  handleFirstPosition() {
    this.setupService.getPointSetup(1, null).subscribe(() => {});

    this.precision = 20;
    this.isFirstDone = true;
  }

  handleSecondPosition() {
    this.setupService.getPointSetup(2, this.secondStar).subscribe(() => {});

    this.precision = 66;
    this.isSecondDone = true;
  }

  handleThirdPosition() {
    this.setupService.getPointSetup(3, this.secondStar).subscribe(() => {});

    this.precision = 100;
    this.isThirdDone = true;
  }

  handleDone() {
    this.setupService.getValidateSetup().subscribe(() => {});

    this.router.navigate([PATH_RACKET]);
  }

  handleReset() {
    this.setupService.getResetSetup().subscribe(() => {});

    this.precision = 0;
    this.isFirstDone = false;
    this.isSecondDone = false;
    this.isThirdDone = false;
  }
}
