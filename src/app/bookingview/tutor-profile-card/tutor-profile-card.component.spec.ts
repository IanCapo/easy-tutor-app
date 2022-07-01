import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileCardComponent } from './tutor-profile-card.component';

describe('TutorProfileCardComponent', () => {
  let component: TutorProfileCardComponent;
  let fixture: ComponentFixture<TutorProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorProfileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
