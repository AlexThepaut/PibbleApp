import { Routes } from '@angular/router';
import { PATH_HOME, PATH_RACKET, PATH_SETUP } from './app.constantes';
import { PibbleMenuComponent } from './pibble-menu/pibble-menu.component';
import { PibbleSetupComponent } from './pibble-setup/pibble-setup.component';
import { PibbleConnectionComponent } from './pibble-connection/pibble-connection.component';
export const ROUTES: Routes = [
    { path: PATH_HOME, component:  PibbleConnectionComponent},
    { path: PATH_RACKET, component: PibbleMenuComponent },
    { path: PATH_SETUP, component: PibbleSetupComponent }
];
