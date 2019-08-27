import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { TABLE_DEEPSKY_OBJECTS, TABLE_DEEPSKY_STARS, TABLE_DEEPSKY_EXOPLANET } from '../app.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface StellarObject {
  name: string;
  type: string;
  const: string;
  mag: number;
}

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
  dataSource: MatTableDataSource<StellarObject>;

  private isDataLoaded = false;

  private objects: Array<StellarObject> = [];

  private filterConstellations = [];
  private filterTypes = [];
  private filterCatalogue = [TABLE_DEEPSKY_OBJECTS, TABLE_DEEPSKY_STARS, TABLE_DEEPSKY_EXOPLANET];

  private typesObjects = [];

  private isFilterType = false;

  catalogueCtrl: FormControl;
  magnitudeCtrl: FormControl;
  constelationCtrl: FormControl;
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
    this.constelationCtrl = fb.control('');
    this.visibleCtrl = fb.control('');
    this.typeCtrl = fb.control('');

    this.filterForm = fb.group({
      catalogue: this.catalogueCtrl,
      magnitude: this.magnitudeCtrl,
      constelation: this.constelationCtrl,
      type: this.typeCtrl,
      visible: this.visibleCtrl
    });

    this.filterForm.controls['type'].disable();
    this.magnitudeCtrl.setValue(100);
    this.visibleCtrl.setValue(false);
  }

  ngOnInit() { }

  applySearch(filterValue: string) {
    // TODO Search
  }

  filterCatalogueChange(event) {
    if (event.value === 'objects') {
      this.filterForm.controls['type'].enable();
      this.catalogueService.getCatalogueObjectTypes().subscribe(
        data => {
          this.filterTypes = data;
        });
    } else {
      this.filterForm.controls['type'].disable();
    }

    this.catalogueService.getCatalogueConstelations(event.value).subscribe(
      data => {
        console.log(data);
        this.filterConstellations = data;
      });
  }

  handleObject(event) {
    this.catalogueService.getCatalogueByName(this.catalogueCtrl.value, event).subscribe(
      data => {
        this.openDialog(data);
      }
    )
  }

  openDialog(data: Object): void {
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
    this.catalogueCtrl.setValue(null);
    this.typeCtrl.setValue(true);
    this.constelationCtrl.setValue(null);
    this.magnitudeCtrl.setValue(100);
    this.visibleCtrl.setValue(false);
  }

  handleSubmitFilter() {
    this.objects.splice(0, this.objects.length);

    this.isDataLoaded = true;
    this.step++;
    this.catalogueService.getCatalogueAllWithFilter(this.catalogueCtrl.value, this.magnitudeCtrl.value, this.constelationCtrl.value, this.typeCtrl.value, this.visibleCtrl.value).subscribe(
      data => {
        let i = 0;
        while (data[i] != undefined) {
          this.objects.push(createNewObject(data[i++]));
          this.isDataLoaded = false;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this.isDataLoaded = false;
      }
    );
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }
}
/** Builds and returns a new User. */
function createNewObject(object: any): StellarObject {

  return {
    name: object.NAME,
    type: object.TYPE,
    const: object.CONSTELATION,
    mag: object.MAGNITUDE
  };
}

@Component({
  selector: 'pibble-catalogue-details-objects.component',
  templateUrl: './pibble-catalogue-details/pibble-catalogue-details-objects.component.html',
  styleUrls: ['./pibble-catalogue-details/pibble-catalogue-details-objects.component.css']
})
export class PibbleCatalogueComponentDetailsObject {

  constructor(
    public dialogRef: MatDialogRef<PibbleCatalogueComponentDetailsObject>,
    @Inject(MAT_DIALOG_DATA) public data: Object) {
      console.log(data);
     }

  return(): void {
    this.dialogRef.close();
  }

}
