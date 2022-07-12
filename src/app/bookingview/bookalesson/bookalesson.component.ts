import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  @Input('subject') subject: string;
  @Output() isBookingConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {  
  }

  public sendBookingRequest() {
    this.isLoading = true;
    let form = this.bookingForm.value;
    let dateArray = form.date.toString().split(' ');
    let day = `${dateArray[0]}`;
    let month = `${dateArray[1]} ${dateArray[2]}`;
    let year = `${dateArray[3]}`;
    let date = `${day}, ${month} ${year}`;
    
    
    let templateParams = {
      subject: form.subject.split(';')[0],
      tutor_name: `${this.tutor.firstname} ${this.tutor.lastname}`,
      recipient_name: `${form.firstname} ${form.lastname}`,
      recipient_email: form.email,
      booking_date: date,
      booking_time: form.time,
      session_url: `${environment.sessionUrl}${this.tutor.id}`
    }
    
    emailjs.send('service_vci4p31', 'template_fxjl1l7', templateParams, 'FuZufDbLFJPfD1Uuz')
    .then(res => {
      console.log('send email', res);
      if(res.status === 200)
        this.isBookingConfirmed.emit(true)
        this.isLoading = false;
    }, (e) => {
      console.log('failed, ', e);
      this.isBookingConfirmed.emit(false);
      this.isLoading = false;
    })
 }
}
