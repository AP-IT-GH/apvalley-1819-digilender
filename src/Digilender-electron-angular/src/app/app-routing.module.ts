import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'calendar', component: HomeCalendarComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeCalendarComponent]