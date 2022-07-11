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

  @Input('tutors') tutors = [];

  constructor() { }

  ngOnInit(): void {
  }

  public toggleTutorDetails(id: string) {
    //this.selectedTutorId = this.selectedTutorId !== id ? id : '';
    if(this.selectedTutorId !== id) {
      this.selectedTutorId = id;
      this.isShowDetails = true;
    } else if(this.selectedTutorId === id) {
      this.selectedTutorId = '';
      this.isShowDetails = false;
    }
  }

  public toggleBookLesson (id: string) {
    
    if(this.selectedTutorId !== id) {
      this.selectedTutorId = id;
      this.isBookLesson = true;
    } else if(this.selectedTutorId === id) {
      this.selectedTutorId = '';
      this.isBookLesson = false;
    }
  }

  public toogleSelectedTeacher(id: string) {
    this.selectedTutorId = this.selectedTutorId !== id ? id : '';
  }
}
