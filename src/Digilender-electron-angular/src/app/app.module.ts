import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';

//componenten
import { AppComponent } from './app.component';
import { HomeCalendarComponent } from './calendar/calendar.component';
import { WeatherComponent } from './weather/weather.component';
import { SlidePanelComponent } from './slide-panel';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';

//services
import { WeatherService } from './weather.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    WeatherComponent,
    AppComponent,
    HomeCalendarComponent,
    SlidePanelComponent,
    OptionsComponent,
    UsersComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    WeatherService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
