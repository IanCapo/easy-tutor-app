import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs';


interface QueryObject {
  key: string,
  value: string
}
@Component({
  selector: 'app-main-booking-view',
  templateUrl: './main-booking-view.component.html',
  styleUrls: ['./main-booking-view.component.scss']
})

export class MainBookingViewComponent implements OnInit {
  public questions: Object[] = [
    {key: 'languagesSpoken', text: "Which language should your teacher speak?"},
    {key: 'subject', text: "What subject are you looking for?"},
    {key: 'type', text: "And what's the purpose of the lesson?"}
  ]

  public numOfQuestions: number = this.questions.length;
  public tutors: string[] = [];
  public currStep = 0;
  public isTutorList = false;
  public queryData: Array<QueryObject> = [];
  public filteredTutors: any[] = [];
  private _dbService;
  public noResults = false;

  public subjectSearched: string = '';

  public inputSuggestions = {
    languagesSpoken: [''],
    subject: [''],
    type: ['']
}


  constructor(dbService: DatabaseService) { 
    this._dbService = dbService;
  }

  ngOnInit(): void {
    this._dbService.getTutors().pipe(
      map(tutors => {
        tutors.forEach((tutor: any) => {
          this.tutors.push(tutor);
        }); 
      })
    )
    .subscribe()
    this._dbService.getTutors().pipe(
      map(tutors => {
        tutors.forEach((tutor:any) => {
          this.getInputSuggestions(tutor)
        });
      })
    ).subscribe()
  }


  private getInputSuggestions(tutor: any) {
    tutor.languagesSpoken.forEach((l: string) => {
      if(!this.inputSuggestions.languagesSpoken.includes(l)) {
        this.inputSuggestions.languagesSpoken.push(l)
      }
    });

    tutor.subjects.forEach((s: any) => {
      if(!this.inputSuggestions.subject.includes(s.name)) {
        this.inputSuggestions.subject.push(s.name)
      }
    });

    tutor.subjects.forEach((s: any) => {
      s.types.forEach((t: string) => {
        if(!this.inputSuggestions.type.includes(t)) {
          this.inputSuggestions.type.push(t)
        }
      })
    });
  }

  public setStep($value: any, $key: string) {
    const obj = this.queryData.find(obj => obj.key === $key)
    if(obj) {
      obj.value = $value;
    } else {
      const queryObj: QueryObject = { key: $key, value: $value }
      this.queryData.push(queryObj)
    }
    
    this.currStep += 1;
    
    if(this.currStep >= this.numOfQuestions) {
      this.filterTutors(this.tutors);
    }   
  }

  public filterTutors(tutors: any) {   
    let backToStep: number = this.questions.length; 

    this.filteredTutors = [...tutors]
    .filter((tutor: any) => {
      const isLanguagesSpoken = this.queryData[0].value ? tutor.languagesSpoken.includes(this.queryData[0].value) : true;
      console.log('isLanguagesSpoken', isLanguagesSpoken);
      if(isLanguagesSpoken) {
        return true
      } else {
        backToStep = 0;
        return false;
      }
    }   
    )
    .filter((tutor: any) => {
      const subject = this.queryData[1].value;
      let subjectExists = subject ? tutor.subjects.some((subj: any) => subj.name === subject) : true;
      
      if (subjectExists){
        this.subjectSearched = subject;
        return true;
      } else {        
        backToStep = backToStep < 1 ? backToStep : 1 ;
        return false;
      }
     })
    .filter((tutor: any) => {
      const subject = this.queryData[1].value;
      const subjType = this.queryData[2].value;
      if(subjType) {
        if(subject) {
          const subjTypes = tutor.subjects.find((subj: any) => subj.name === subject).types;
          
            let hasSubjectType = subjTypes
              .map((type: string) => type.toLowerCase())
              .includes(this.queryData[2].value.toLowerCase())
            console.log('hasSubjectType', hasSubjectType);
            if(hasSubjectType) {
              return true;
            } else {
              backToStep = backToStep < 2 ? backToStep : 2;
              return false;
            }
        } else {
          return true;
        }
      } else {
        return true;
      }
    })
    
    if(this.filteredTutors.length === 0) {
      console.log('0 tutors found');
      
      this.isTutorList = false;
      this.noResults = true;
      console.log(backToStep);
      
      this.currStep = backToStep;
    } else {
      this.isTutorList = true;
      this.noResults = false;
    }
   }
}
