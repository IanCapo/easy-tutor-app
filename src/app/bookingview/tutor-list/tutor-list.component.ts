import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit {
  
  @Input('tutors') tutors = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.tutors);
  }

}
