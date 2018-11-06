import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from 'ng-fullcalendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
