import { environment } from './../environments/environment';
import { ButtonComponent } from './shared/components/button/button.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainBookingViewComponent } from './bookingview/main-booking-view/main-booking-view.component';
import { InputgroupComponent } from './bookingview/inputgroup/inputgroup.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import {MatInputModule} from '@angular/material/input'; 

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TutorListComponent } from './bookingview/tutor-list/tutor-list.component';
import { TutorProfileCardComponent } from './bookingview/tutor-profile-card/tutor-profile-card.component';
import { HttpClientModule } from '@angular/common/http';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainBookingViewComponent,
    InputgroupComponent,
    TutorListComponent,
    TutorProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    SocketIoModule.forRoot(config),
    MatInputModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


