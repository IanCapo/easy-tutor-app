import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.scss']
})
export class TutorDetailComponent implements OnInit {

  @Input('selectedTutor') tutor: any = {};
  constructor() { }

  ngOnInit(): void {
    
  }

}
