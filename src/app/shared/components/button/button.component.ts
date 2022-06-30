import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  public isVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
   this.isVisible = false;
  }
}


