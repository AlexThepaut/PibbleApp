import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { TABLE_DEEPSKY_OBJECTS, TABLE_DEEPSKY_STARS, TABLE_SOLAR_OBJECTS, TABLE_USER_OBJECTS } from '../app.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkyObjects, SolarSystemObject, DeepSkyObject } from '../models/pibble-object.model';
import { RacketService } from '../services/racket.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-pibble-catalogue',
  templateUrl: './pibble-catalogue.component.html',
  styleUrls: ['./pibble-catalogue.component.css']
})
export class PibbleCatalogueComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'const', 'mag'];
  dataSource: MatTableDataSource<SkyObjects>;

  private isDataLoaded = true;

  private objects: Array<SkyObjects> = [];

  private filterConstellations = [];
  private filterTypes = [];
  private filterCatalogue = [TABLE_DEEPSKY_OBJECTS, TABLE_DEEPSKY_STARS, TABLE_SOLAR_OBJECTS, TABLE_USER_OBJECTS];

  private typesObjects = [];

  private isFilterType = false;

  catalogueCtrl: FormControl;
  magnitudeCtrl: FormControl;
  constellationCtrl: FormControl;
  typeCtrl: FormControl;
  visibleCtrl: FormControl;
  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private catalogueService: CatalogueService, public dialog: MatDialog, private fb: FormBuilder) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.objects);

    this.catalogueCtrl = fb.control('', [Validators.required]);
    this.magnitudeCtrl = fb.control('');
    this.constellationCtrl = fb.control('');
    this.visibleCtrl = fb.control('');
    this.typeCtrl = fb.control('');

    this.filterForm = fb.group({
      catalogue: this.catalogueCtrl,
      magnitude: this.magnitudeCtrl,
      constellation: this.constellationCtrl,
      type: this.typeCtrl,
      visible: this.visibleCtrl
    });

    this.filterForm.controls['magnitude'].disable();
    this.filterForm.controls['type'].disable();
    this.filterForm.controls['visible'].disable();
    this.filterForm.controls['constellation'].disable();
    this.magnitudeCtrl.setValue(100);
    this.visibleCtrl.setValue(false);
  }

  ngOnInit() { }

  filterCatalogueChange(event) {
    switch (event.value) {
      case TABLE_DEEPSKY_STARS:
          this.filterForm.controls['visible'].enable();
        this.filterForm.controls['type'].disable();
        this.filterForm.controls['magnitude'].enable();
        this.typeCtrl.setValue('');
        this.constellationCtrl.setValue('');
        this.getConstellations(event.value);
        break;
      case TABLE_DEEPSKY_OBJECTS:
          this.filterForm.controls['visible'].enable();
        this.filterForm.controls['magnitude'].enable();
        this.typeCtrl.setValue('');
        this.constellationCtrl.setValue('');
        this.getConstellations(event.value);
        this.getTypes();
        break;
      default:
        this.typeCtrl.setValue('');
        this.constellationCtrl.setValue('');
        this.magnitudeCtrl.setValue(100);
        this.filterForm.controls['magnitude'].disable();
        this.filterForm.controls['type'].disable();
        this.filterForm.controls['constellation'].disable();
        this.filterForm.controls['visible'].disable();
        break;
    }
  }

  getTypes() {
    this.filterForm.controls['type'].enable();
    this.catalogueService.getCatalogueObjectTypes().subscribe(
      data => {
        this.filterTypes = data;
      });
  }

  getConstellations(constellation: String) {
    this.filterForm.controls['constellation'].enable();
    this.catalogueService.getCatalogueConstelations(constellation).subscribe(
      data => {
        this.filterConstellations = data;
      });
  }

  handleObject(event) {
    /*this.catalogueService.getCatalogueByName(this.catalogueCtrl.value, event).subscribe(
      data => {
        this.openDialog(data);
      }
    )*/
    
    this.openDialog(this.objects[this.objects.findIndex(p => p.name.toLowerCase() === event.toLowerCase())]);
  }

  openDialog(data: SkyObjects): void {
    const dialogRef = this.dialog.open(PibbleCatalogueComponentDetailsObject, {
      width: '90vw',
      height: '90vh',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handleResetFilter() {
    this.filterForm.controls['magnitude'].disable();
    this.filterForm.controls['type'].disable();
    this.filterForm.controls['constellation'].disable();
    this.filterForm.controls['visible'].disable();
    this.catalogueCtrl.setValue(null);
    this.typeCtrl.setValue(true);
    this.constellationCtrl.setValue(null);
    this.typeCtrl.setValue(null);
    this.magnitudeCtrl.setValue(100);
    this.visibleCtrl.setValue(false);
  }

  handleSubmitFilter() {
    this.objects.splice(0, this.objects.length);

    this.isDataLoaded = false;
    this.step++;

    if (this.catalogueCtrl.value === TABLE_SOLAR_OBJECTS) {
      this.catalogueService.getEphemerides().subscribe((data: Array<String>) => {
        data.forEach((ephemeride) => {
          if (!ephemeride.includes('earth')) {
            this.objects.push(new SolarSystemObject(ephemeride));
          }
          this.isDataLoaded = true;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
          error => {
            this.isDataLoaded = true;
          });
      })
    } else {
      this.catalogueService.getCatalogueAllWithFilter(this.catalogueCtrl.value, this.catalogueCtrl.value === TABLE_USER_OBJECTS ? '' : this.magnitudeCtrl.value, this.constellationCtrl.value, this.typeCtrl.value, this.visibleCtrl.value).subscribe(
        (data: Array<DeepSkyObject>) => {
          if (this.catalogueCtrl.value === TABLE_DEEPSKY_OBJECTS) {
            data.forEach((object) => {
              this.objects.push(<DeepSkyObject>object);
            })
          }

          this.isDataLoaded = true;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          this.isDataLoaded = true;
        }
      );
    }
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }
}

@Component({
  selector: 'pibble-catalogue-details-objects.component',
  templateUrl: './pibble-catalogue-details/pibble-catalogue-details-objects.component.html',
  styleUrls: ['./pibble-catalogue-details/pibble-catalogue-details-objects.component.css']
})
export class PibbleCatalogueComponentDetailsObject {

  constructor(
    public dialogRef: MatDialogRef<PibbleCatalogueComponentDetailsObject>,
    @Inject(MAT_DIALOG_DATA) public data: SkyObjects, public telescopeService: RacketService) {
    console.log(JSON.parse(JSON.stringify(data)));
  }

  handleGoTo() {
    this.return();

    // TODO Finir l'envoie de la requète
    this.telescopeService.telescopeGoTo('', null);
  }

  return(): void {
    this.dialogRef.close();
  }

}
