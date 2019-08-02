import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { TABLE_DEEPSKY_OBJECTS } from '../app.constantes';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private catalogueService: CatalogueService, public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.objects);
  }

  ngOnInit() {
    // this.http.get("../../assets/csvjson.json").subscribe(data => {
    //   let i = 0;
    //   while (data[i] != undefined) {
    //     this.objects.push(createNewObject(data[i++]));
    //     this.isDataLoaded = true;

    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }
    // });

    this.catalogueService.getCatalogueAll(TABLE_DEEPSKY_OBJECTS).subscribe(
      data => {
        console.log(data);
        let i = 0;
        while (data[i] != undefined) {
          this.objects.push(createNewObject(data[i++]));
          this.isDataLoaded = true;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  applySearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleObject(event) {
    this.catalogueService.getCatalogueObjectByName(TABLE_DEEPSKY_OBJECTS, event).subscribe(
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

  }

  handleApplyFilter() {
    
  }
}
/** Builds and returns a new User. */
function createNewObject(object: any): StellarObject {

  return {
    name: object.OBJECT,
    type: object.TYPE,
    const: object.CON,
    mag: object.MAG
  };
}

@Component({
  selector: 'pibble-catalogue-details-objects.component',
  templateUrl: './pibble-catalogue-details/pibble-catalogue-details-objects.component.html',
})
export class PibbleCatalogueComponentDetailsObject {

  constructor(
    public dialogRef: MatDialogRef<PibbleCatalogueComponentDetailsObject>,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
