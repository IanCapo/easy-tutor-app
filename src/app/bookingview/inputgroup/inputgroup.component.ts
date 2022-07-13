import { Component, Injectable, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';



@Component({
  selector: 'app-inputgroup',
  templateUrl: './inputgroup.component.html',
  styleUrls: ['./inputgroup.component.scss']
})
export class InputgroupComponent implements OnInit {
    @Input('title') title = '';
    @Input('inputSuggestions') options: string[] = [];
    @Output() newBlurEvent = new EventEmitter();

  inputControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(val => this._filter(val || '')),
    );
  }

  private _filter(val: string): string[] {
    const filterVal = val.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterVal));
  }

  public onBlur($event: any) {
    this.newBlurEvent.emit($event.target.value);
  }  
}

