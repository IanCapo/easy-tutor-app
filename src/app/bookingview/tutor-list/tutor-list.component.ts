import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit {
  public selectedTutorId = '';

  @Input('tutors') tutors = [];

  constructor() { }

  ngOnInit(): void {
  }

  public toggleTutorDetails(id: string) {
    this.selectedTutorId = this.selectedTutorId !== id ? id : '';
  }
}
