import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET, TABLE_DEEPSKY_STARS } from '../app.constantes';
import { SetupService } from '../services/setup.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { StarObject, SkyObjects } from '../models/pibble-object.model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-pibble-setup',
  templateUrl: './pibble-setup.component.html',
  styleUrls: ['./pibble-setup.component.css']
})
export class PibbleSetupComponent implements OnInit {

  secondStarSelect: StarObject[];
  thirdStarSelect: StarObject[];

  selectSecondStar: FormControl;
  selectThirdStar: FormControl;

  setupForm: FormGroup;

  starAutocompleteSecond: Subscription;
  starAutocompleteThird: Subscription;

  constructor(private router: Router, private setupService: SetupService, private catalogueService: CatalogueService, private fb: FormBuilder) {
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

    this.setupService.actualSetup.isSecondStarSet ? this.selectSecondStar.enable() : this.selectSecondStar.disable();
    this.setupService.actualSetup.isThirdStarSet ? this.selectThirdStar.enable() : this.selectThirdStar.disable();

    this.starAutocompleteSecond = this.selectSecondStar.valueChanges.subscribe(value => {
      this.catalogueService.getCatalogueAllWithFilter(TABLE_DEEPSKY_STARS, null, null, null, null, value).subscribe((result: StarObject[]) => {
        this.secondStarSelect = result;

      });
    }, error => console.error(error));

    this.starAutocompleteThird = this.selectThirdStar.valueChanges.subscribe(value => {
      this.catalogueService.getCatalogueAllWithFilter(TABLE_DEEPSKY_STARS, null, null, null, null, value).subscribe((result: StarObject[]) => {
        this.thirdStarSelect = result;

      });
    }, error => console.error(error));
  }

  trackItem(index: number, item: StarObject) {
    return item.id;
  }

  handleReturn() {
    this.router.navigate([PATH_RACKET]);
  }

  handleFirstPosition() {
    this.setupService.getPointSetup(1, null).subscribe(() => {
      this.setupService.actualSetup.precision = 20;
      this.setupService.actualSetup.isCelestialPoleSet = true;
      this.selectSecondStar.enable()
    });
  }

  handleSecondPosition() {
    this.setupService.getPointSetup(2, this.setupService.actualSetup.secondStar.name).subscribe(() => {
      this.setupService.actualSetup.precision = 66;
      this.setupService.actualSetup.isSecondStarSet = true;
      this.selectThirdStar.enable()
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
