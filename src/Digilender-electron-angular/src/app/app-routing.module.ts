import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './googleSyncCalendar/auth.component';
import { HomeComponent } from './home/home.component';
import { calendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'calendar', component: calendarComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [calendarComponent]
