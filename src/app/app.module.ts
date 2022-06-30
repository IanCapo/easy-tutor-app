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



@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainBookingViewComponent,
    InputgroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


