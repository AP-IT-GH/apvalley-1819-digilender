import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { WifiComponent } from './wifi/wifi.component';
import { LocatieComponent } from './locatie/locatie.component';
import { ThemaComponent } from './thema/thema.component';
import { SchermComponent } from './scherm/scherm.component';
import { IntroSetupComponent } from "./intro-setup/intro-setup.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'intro', component: IntroSetupComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'wifi', component: WifiComponent },
      { path: 'locatie', component: LocatieComponent },
      { path: 'thema', component: ThemaComponent },
      { path: 'scherm', component: SchermComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CalendarComponent,
  OptionsComponent,
  UsersComponent,
  WifiComponent,
  LocatieComponent,
  ThemaComponent,
  SchermComponent,
  IntroSetupComponent,
  HomeComponent]
