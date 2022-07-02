import { Component, Injectable, Input, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-inputgroup',
  templateUrl: './inputgroup.component.html',
  styleUrls: ['./inputgroup.component.scss']
})
export class InputgroupComponent {
  @Input('title') title = '';
  @Output() newBlurEvent = new EventEmitter();
  
  constructor() {}

  onBlur($event: any) {
    this.newBlurEvent.emit($event.target.value);
  }  
}

