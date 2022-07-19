import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputgroupComponent } from './inputgroup.component';

describe('InputgroupComponent', () => {
    let component: InputgroupComponent;
    let fixture: ComponentFixture<InputgroupComponent>

    beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        InputgroupComponent
      ], 
    imports: [
      MatAutocompleteModule
    ]})
      .compileComponents();
    })

    beforeEach(() => {
      fixture = TestBed.createComponent(InputgroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should create a form with one control', () => {
      expect(component.inputControl).toBeTruthy();
    });

    it('should return array of suggestions after value input', () => {
      const options: string[] = [
        '',
        'ABC',
        'BDA',
        'CGE'
      ];

      expect(component._filter('B', options)).toEqual(['ABC', 'BDA']);
      expect(component._filter('', options)).toEqual(['', 'ABC','BDA', 'CGE']);
    });

    it('should emit the input value on blur', () => {
      let $event = {
        target: {
          value: 'input value'
      }};
      spyOn(component.newBlurEvent, 'emit');
      component.onBlur($event);
      fixture.detectChanges();
      expect(component.newBlurEvent.emit).toHaveBeenCalledWith('input value');
    });
  });

