import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-booking-view',
  templateUrl: './main-booking-view.component.html',
  styleUrls: ['./main-booking-view.component.scss']
})
export class MainBookingViewComponent implements OnInit {
  public questions: Object[] = [
    {index: 0, text: "Which language should your teacher speak?"},
    {index: 1, text: "What subject are you looking for?"},
    {index: 2, text: "And what's the purpose of the lesson?"}
  ]

  public tutors: Object[] = [
    {
      name: "Josh",
      lastname: "Miller",
      subjects: [
        {
          name: "English",
          types: [
            "Conversation",
            "Exam Preparation",
            "Grammar"
          ],
          levels: [
            "Primary school",
            "Highschool",
            "University"
          ],
        },
        {
          name: "German",
          types: [
            "Conversation",
            "Exam Preparation",
            "Grammar"
          ],
          levels: [
            "Primary school",
            "Highschool",
            "University"
          ],
        }
      ],
      description: "Lorem ispum dolor sit amet, lorem ispum dolor sit amet. Lorem ispum dolor sit amet..."
    }
  ]
  public currStep = 0;
  public isTutorList = false;

  constructor() { }

  ngOnInit(): void {
  }

  public setStep() {
    this.currStep += 1;
    console.log(this.currStep);
    
    if(this.currStep >= this.questions.length) {
     this.isTutorList = !this.isTutorList;
    }   
  }
}
