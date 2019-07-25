import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSliderModule,
  MatMenuModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PibbleCatalogueComponent } from './pibble-catalogue/pibble-catalogue.component';
import { PibbleMenuComponent } from './pibble-menu/pibble-menu.component';
import { PibbleRacketComponent } from './pibble-racket/pibble-racket.component';
import { PibbleSetupComponent } from './pibble-setup/pibble-setup.component';
import { PibbleConnectionComponent } from './pibble-connection/pibble-connection.component';
import { PibbleInfoComponent } from './pibble-info/pibble-info.component';
import { PibbleAddObjectComponent } from './pibble-add-object/pibble-add-object.component';
import { PibbleObjectDescriptionComponent } from './pibble-object-description/pibble-object-description.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PibbleCatalogueComponent,
    PibbleMenuComponent,
    PibbleRacketComponent,
    PibbleSetupComponent,
    PibbleConnectionComponent,
    PibbleInfoComponent,
    PibbleAddObjectComponent,
    PibbleObjectDescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatMenuModule,
    MatStepperModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
