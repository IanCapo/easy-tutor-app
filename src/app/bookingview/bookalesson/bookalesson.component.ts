import { Subject } from 'rxjs';
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
    subject: new FormControl('', [
      Validators.required
    ]),
    firstname: new FormControl('', [
      Validators.required
    ]),
    lastname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    time: new FormControl('', [
      Validators.required
    ])
  });
  
  @Input('selectedTutor') tutor: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  public sendBookingRequest() {
    let form = this.bookingForm.value;
    let templateParams = {
      subject: form.subject,
      tutor_name: `${this.tutor.firstname} ${this.tutor.lastname}`,
      recipient_name: `${form.firstname} ${form.lastname}`,
      recipient_email: form.email,
      booking_date: form.date,
      booking_time: form.time,
      session_url: `http://localhost:4200/session/${this.tutor.id}`
    }
    
    emailjs.send('service_vci4p31', 'template_fxjl1l7', templateParams, 'FuZufDbLFJPfD1Uuz')
    .then(res => {
      console.log('send email', res);
    }, (e) => {
      console.log('failed, ', e);
    })
  }
}
