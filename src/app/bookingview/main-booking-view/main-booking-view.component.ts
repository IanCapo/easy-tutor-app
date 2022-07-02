import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, switchMap, filter, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-main-booking-view',
  templateUrl: './main-booking-view.component.html',
  styleUrls: ['./main-booking-view.component.scss']
})

export class MainBookingViewComponent implements OnInit {
  public questions: Object[] = [
    {key: 'languageSpoken', text: "Which language should your teacher speak?"},
    {key: 'subject', text: "What subject are you looking for?"},
    {key: 'type', text: "And what's the purpose of the lesson?"}
  ]

  public tutors: string[] = [];
  public currStep = 0;
  public isTutorList = false;
  public queryData: object[] = [];
  public filteredTutors: any[] = [];
  private _dbService;

  constructor(dbService: DatabaseService) { 
    this._dbService = dbService;
  }

  ngOnInit(): void {
    this._dbService.getTutors().pipe(
      map(tutors => {
        tutors.forEach((tutor: any) => this.tutors.push(tutor))
      })
    )
    .subscribe()
  }

  public setStep($value: any, $key: string) {
    const queryObj = { key: $key, value: $value }
    
    this.queryData.push(queryObj)
    this.currStep += 1;
    
    if(this.currStep >= this.questions.length) {
      this.filterTutors(this.tutors);
     this.isTutorList = !this.isTutorList;
    }   
  }

  public filterTutors(tutors: any) {
    this.filteredTutors = tutors.filter((tutor: any) => {
      return tutor.languagesSpoken.includes(this.queryData[0]);
    }   
    )
    .filter((tutor: any) => {
      const subject = this.queryData[1];
      return tutor.subjects.some((subj: any) => subj.name === subject);
     })
    .filter((tutor: any) => {
      const subject = this.queryData[1];
      const subjTypes = tutor.subjects.find((subj: any) => subj.name === subject).types;
      return (
        subjTypes
          .map((type: string) => type.toLowerCase())
          .includes(this.queryData[2].toLowerCase())
        )
    })
  }
}
