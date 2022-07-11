import { Component, OnInit, Input } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormControl,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookalesson',
  templateUrl: './bookalesson.component.html',
  styleUrls: ['./bookalesson.component.scss']
})
export class BookalessonComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required
    ]),
    lastname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])
  });
  
  @Input('selectedTutor') tutor: any;

  constructor() { }

  ngOnInit(): void {
  }

  public sendBookingRequest() {
    console.log(this.bookingForm.value.firstname);

    //this.confirmBooking();
  }

  public confirmBooking() {
    let form = this.bookingForm.value;
    let templateParams = {
      tutor_name: `${this.tutor.firstname} ${this.tutor.lastname}`,
      recipient_name: `${form.firstname} ${form.lastname}`,
      recipient_email: form.email,
      booking_date: "12.08.2022",
      booking_time: "14:00",
      session_url: 'http://localhost:4200/session/1234'
    }
    console.log(templateParams);
    
    // emailjs.send('service_vci4p31', 'template_fxjl1l7', templateParams, 'FuZufDbLFJPfD1Uuz')
    // .then(res => {
    //   console.log('send email', res);
    // }, (e) => {
    //   console.log('failed, ', e);
    // })
  }
}
