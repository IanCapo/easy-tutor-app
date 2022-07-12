import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit {
  public selectedTutorId = '';
  public isShowDetails = false;
  public isBookLesson = false;
  public showBookingConfirmation: boolean = false;
  public isBookingConfirmation: boolean;

  @Input('tutors') tutors = [];
  @Input('soughtAfterSubject') soughtAfterSubject: string;

  constructor() { }

  ngOnInit(): void {}

  public toggleTutorCard(id: string, action: string) {
    this.selectedTutorId = id;
    if(action === 'book') {
      this.isShowDetails = false;
      this.isBookLesson = !this.isBookLesson;
    }
    if(action == 'details') {
      this.isBookLesson = false;
      this.isShowDetails = !this.isShowDetails;
    }
  }

  closeDetails() {
    this.selectedTutorId = '';
    this.isBookLesson = false;
    this.isShowDetails = false;
  }

    updateComponent(event: any) {
      console.log(event);
      this.showBookingConfirmation = true
      this.isBookingConfirmation = event;
    }

    reset() {
      this.isBookLesson = false;
      this.isBookingConfirmation = false;
      this.isShowDetails = false;
      this.showBookingConfirmation = false;
    }
}
