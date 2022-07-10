import { MainBookingViewComponent } from './bookingview/main-booking-view/main-booking-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionMainComponent } from './rtcview/session-main/session-main.component';

const routes: Routes = [
  { path: '', component: MainBookingViewComponent },
  { path: 'session/:room', component: SessionMainComponent },
  { path: '**', component: MainBookingViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
