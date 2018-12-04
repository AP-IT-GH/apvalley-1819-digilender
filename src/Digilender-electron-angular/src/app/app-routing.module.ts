import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'calendar', component: HomeCalendarComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeCalendarComponent]