import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './googleSyncCalendar/auth.component';
import { HomeComponent } from './home/home.component';
import { HomeCalendarComponent } from './calendar/calendar.component';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar', component: HomeCalendarComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'options', component: OptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeCalendarComponent]
