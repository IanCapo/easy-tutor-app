import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookalessonComponent } from './bookalesson.component';

describe('BookalessonComponent', () => {
  let component: BookalessonComponent;
  let fixture: ComponentFixture<BookalessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookalessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookalessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
