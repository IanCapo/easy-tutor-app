import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-bookalesson',
  templateUrl: './bookalesson.component.html',
  styleUrls: ['./bookalesson.component.scss']
})
export class BookalessonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public sendBookingRequest() {
    console.log('booked');
    this.confirmBooking();
  }

  public confirmBooking() {
    let templateParams = {
      tutor_name: "Peter",
      recipient_name: "Kate",
      recipient_email: "fabian.pasin@tallence.com",
      booking_date: "12.08.2022",
      booking_time: "14:00",
      session_url: 'http://localhost:4200/session/1234'
    }
    emailjs.send('service_vci4p31', 'template_fxjl1l7', templateParams, 'FuZufDbLFJPfD1Uuz')
    .then(res => {
      console.log('send email', res);
    }, (e) => {
      console.log('failed, ', e);
    })
  }
}
