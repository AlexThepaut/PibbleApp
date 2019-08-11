import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_SETUP } from '../app.constantes';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pibble-racket',
  templateUrl: './pibble-racket.component.html',
  styleUrls: ['./pibble-racket.component.css']
})
export class PibbleRacketComponent implements OnInit {

  private ra: string;
  private dec: string;
  private alt: string;
  private az: string;

  private toggleIconRealTime = 'play_arrow';
  private isPositionUpdate = true;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.ra = '21 10.6';
    this.dec = '+33 46';
    this.alt = '90°';
    this.az = '52,9°';
  }

  handleSetup() {
    this.router.navigate([PATH_SETUP]);
  }

  handleAdd() {
    this.openDialog({});
  }

  toggleRealTimePosition() {
    this.isPositionUpdate = this.toggleIconRealTime === 'play_arrow' ? false : true;
    this.toggleIconRealTime = this.toggleIconRealTime === 'play_arrow' ? 'pause' : 'play_arrow';
  }

  openDialog(data: Object): void {
    const dialogRef = this.dialog.open(PibbleAddObject, {
      width: '90vw',
      height: '90vh',
      data: new Coordinate(this.ra, this.dec)
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
    @Inject(MAT_DIALOG_DATA) public data: Coordinate,
    private fb: FormBuilder) {

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

  return(): void {
    this.dialogRef.close();
  }
}

class Coordinate {
  constructor(public ra: String, public dec: String) { }
}
