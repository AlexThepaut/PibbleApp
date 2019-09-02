import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_SETUP } from '../app.constantes';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RacketService } from '../services/racket.service';
import { PibbleCoordinate } from '../models/pibble-coordinate.model';
import { SetupService } from '../services/setup.service';
import { CatalogueService } from '../services/catalogue.service';
import { UserObject } from '../models/pibble-object.model';

@Component({
  selector: 'app-pibble-racket',
  templateUrl: './pibble-racket.component.html',
  styleUrls: ['./pibble-racket.component.css']
})
export class PibbleRacketComponent implements OnInit {

  private coordonite = new PibbleCoordinate();

  private realTimePosition;

  private speed: number;

  private toggleIconRealTime = 'play_arrow';
  private isPositionUpdate = true;
  
  constructor(private router: Router, public dialog: MatDialog, private racketService: RacketService, private setupService: SetupService) {
    
  }

  ngOnInit() {
    this.speed = 0;
    this.updatePosition();
  }

  handleMove(direction: String) {
    console.log(direction);
    console.log(this.speed);
    this.racketService.telescopeMove(direction, this.speed).subscribe(() => { });
  }

  handleSetup() {
    this.router.navigate([PATH_SETUP]);
  }

  handleAdd() {
    this.openDialog({});
  }

  handleTrack() {
    console.log('move')
    this.racketService.telescopeTrack().subscribe(() => { });
  }

  handleStop() {
    console.log('stop')
    this.racketService.telescopeStop().subscribe(() => { });
  }

  handleBreakMotion() {

  }

  toggleRealTimePosition() {
    this.isPositionUpdate = this.toggleIconRealTime === 'play_arrow' ? false : true;
    this.toggleIconRealTime = this.toggleIconRealTime === 'play_arrow' ? 'pause' : 'play_arrow';

    if (this.isPositionUpdate) {
      clearInterval(this.realTimePosition);
    } else {
      this.realTimePosition = setInterval(() => { this.updatePosition() }, 1000);
    }
  }

  updatePosition() {
    this.racketService.telescopePosiion().subscribe(data => {
      console.log(data);
      this.coordonite.ra = data.ra;
      this.coordonite.dec = data.dec;
      this.coordonite.alt = data.alt;
      this.coordonite.az = data.az;
    });
  }

  openDialog(data: Object): void {
    const dialogRef = this.dialog.open(PibbleAddObject, {
      width: '90vw',
      height: '90vh',
      data: this.coordonite
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'pibble-add-objects.component',
  templateUrl: './pibble-add-object/pibble-add-objects.component.html',
  styleUrls: ['./pibble-add-object/pibble-add-objects.component.css']
})
export class PibbleAddObject {

  nameCtrl: FormControl;
  raCtrl: FormControl;
  decCtrl: FormControl;
  descCtrl: FormControl;
  addObjectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PibbleAddObject>,
    @Inject(MAT_DIALOG_DATA) public data: PibbleCoordinate,
    private fb: FormBuilder, private catalogueService: CatalogueService) {

    this.nameCtrl = fb.control('', [Validators.required]);
    this.raCtrl = fb.control('', [Validators.required]);
    this.decCtrl = fb.control('', [Validators.required]);
    this.descCtrl = fb.control('', [Validators.required]);

    this.addObjectForm = fb.group({
      name: this.nameCtrl,
      ra: this.raCtrl,
      dec: this.decCtrl,
      desc: this.descCtrl
    });

    this.decCtrl.setValue(data.dec);
    this.raCtrl.setValue(data.ra);
  }

  handleAddObject() {
    let currentObject = new UserObject(this.nameCtrl.value, this.raCtrl.value, this.decCtrl.value, this.descCtrl.value);
    this.catalogueService.addObjectInCatalogue(currentObject).subscribe(() => {
      this.return();
    });
  }

  return(): void {
    this.dialogRef.close();
  }
}
