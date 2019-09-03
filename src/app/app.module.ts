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
  MatSortModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PibbleCatalogueComponent, PibbleCatalogueComponentDetailsObject } from './pibble-catalogue/pibble-catalogue.component';
import { PibbleMenuComponent } from './pibble-menu/pibble-menu.component';
import { PibbleRacketComponent, PibbleAddObject } from './pibble-racket/pibble-racket.component';
import { PibbleSetupComponent } from './pibble-setup/pibble-setup.component';
import { PibbleConnectionComponent } from './pibble-connection/pibble-connection.component';
import { PibbleInfoComponent } from './pibble-info/pibble-info.component';
import { HttpClientModule } from '@angular/common/http';
import { PibbleJoystickComponent } from './pibble-joystick/pibble-joystick.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { API_ADDRESS, API_SOCKET_PORT } from './app.constantes';

const config: SocketIoConfig = { url: API_ADDRESS + API_SOCKET_PORT, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PibbleCatalogueComponent,
    PibbleMenuComponent,
    PibbleRacketComponent,
    PibbleSetupComponent,
    PibbleConnectionComponent,
    PibbleInfoComponent,
    PibbleCatalogueComponentDetailsObject,
    PibbleAddObject,
    PibbleJoystickComponent,
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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PibbleCatalogueComponentDetailsObject,
    PibbleAddObject,
  ],
})
export class AppModule { }
