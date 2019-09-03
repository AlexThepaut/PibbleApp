import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_RACKET } from '../app.constantes';
import { SetupService } from '../services/setup.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StarObject } from '../models/pibble-object.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pibble-setup',
  templateUrl: './pibble-setup.component.html',
  styleUrls: ['./pibble-setup.component.css']
})
export class PibbleSetupComponent implements OnInit {

  starSelect = [];

  selectSecondStar = new FormControl();
  selectThirdStar = new FormControl();

  filteredOptionsSecond: Observable<StarObject[]>;
  filteredOptionsThird: Observable<StarObject[]>;

  constructor(private router: Router, private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getInitSetup().subscribe(data => {
      this.setupService.actualSetup.isSetUp = false;
      this.starSelect = data;
    });

    this.filteredOptionsSecond = this.selectSecondStar.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.starSelect.slice())
      );

    this.filteredOptionsThird = this.selectThirdStar.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.starSelect.slice())
      );
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

  displayFn(user?: StarObject): String {
    return user ? user.name : undefined;
  }

  private _filter(name: string): StarObject[] {
    const filterValue = name.toLowerCase();

    return this.starSelect.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
