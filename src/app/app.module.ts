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
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ReactiveFormsModule } from '@angular/forms';
import { TutorListComponent } from './bookingview/tutor-list/tutor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TutorDetailComponent } from './bookingview/tutor-detail/tutor-detail.component';
import { SessionMainComponent } from './rtcview/session-main/session-main.component';
import { ChatComponentComponent } from './rtcview/chat-component/chat-component.component';
import { BookalessonComponent } from './bookingview/bookalesson/bookalesson.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainBookingViewComponent,
    InputgroupComponent,
    TutorListComponent,
    TutorDetailComponent,
    SessionMainComponent,
    ChatComponentComponent,
    BookalessonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  exports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


