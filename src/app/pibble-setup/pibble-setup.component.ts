import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';
import { SetupService } from '../services/setup.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StarObject, SkyObjects } from '../models/pibble-object.model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pibble-setup',
  templateUrl: './pibble-setup.component.html',
  styleUrls: ['./pibble-setup.component.css']
})
export class PibbleSetupComponent implements OnInit {

  secondStarSelect: SkyObjects[];
  thirdStarSelect: SkyObjects[];

  selectSecondStar: FormControl;
  selectThirdStar: FormControl;

  setupForm: FormGroup;

  constructor(private router: Router, private setupService: SetupService, private fb: FormBuilder) {
    this.selectSecondStar = fb.control('');
    this.selectThirdStar = fb.control('');

    this.setupForm = fb.group({
      selectSecondStar: this.selectSecondStar,
      selectThirdStar: this.selectThirdStar,
    });
  }

  ngOnInit() {
    this.setupService.getInitSetup().subscribe(data => {
      this.setupService.actualSetup.isSetUp = false;
      this.secondStarSelect = data;
      this.thirdStarSelect = data;
    });
  }

  handleReturn() {
    this.router.navigate([PATH_RACKET]);
  }

  handleFirstPosition() {
    this.setupService.getPointSetup(1, null).subscribe(() => {
      this.setupService.actualSetup.precision = 20;
      this.setupService.actualSetup.isCelestialPoleSet = true;
    });
  }

  handleSecondPosition() {
    this.setupService.getPointSetup(2, this.setupService.actualSetup.secondStar.name).subscribe(() => {
      this.setupService.actualSetup.precision = 66;
      this.setupService.actualSetup.isSecondStarSet = true;
    });
  }

  handleThirdPosition() {
    this.setupService.getPointSetup(3, this.setupService.actualSetup.thirdStar.name).subscribe(() => {
      this.setupService.actualSetup.precision = 100;
      this.setupService.actualSetup.isThirdStarSet = true;
    });
  }

  handleDone() {
    this.setupService.getValidateSetup().subscribe(() => {
      this.router.navigate([PATH_RACKET]);
      this.setupService.actualSetup.isSetUp = true;
    });
  }

  handleReset() {
    this.setupService.getResetSetup().subscribe(() => {
      this.setupService.actualSetup.isSetUp = false;
      this.setupService.actualSetup.precision = 0;
      this.setupService.actualSetup.isCelestialPoleSet = false;
      this.setupService.actualSetup.isSecondStarSet = false;
      this.setupService.actualSetup.isThirdStarSet = false;
    });
  }
}
