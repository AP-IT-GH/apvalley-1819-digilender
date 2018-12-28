import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './googleSyncCalendar/auth.component';
import { HomeCalendarComponent } from './calendar/calendar.component';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { WifiComponent } from './wifi/wifi.component';
import { LocatieComponent } from './locatie/locatie.component';
import { ThemaComponent } from './thema/thema.component';
import { SchermComponent } from './scherm/scherm.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar', component: HomeCalendarComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'wifi', component: WifiComponent },
  { path: 'locatie', component: LocatieComponent },
  { path: 'thema', component: ThemaComponent },
  { path: 'scherm', component: SchermComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeCalendarComponent]
