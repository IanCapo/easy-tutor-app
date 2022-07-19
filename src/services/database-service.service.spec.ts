import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DatabaseService } from './database.service';
import * as mockData from '../../databaseData/tutors.json';


describe('DatabaseService', () => {
    let service: DatabaseService;
    const url = 'https://easytutor-prototype-default-rtdb.europe-west1.firebasedatabase.app/tutors.json';
    let httpController: HttpTestingController;
    let tutors = mockData;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      service = TestBed.inject(DatabaseService);
      httpController = TestBed.inject(HttpTestingController)
    });

    it('should call getTutors and return array of tutors', () => {
      service.getTutors().subscribe((res) => {
        expect(res).toEqual(tutors);
      })

      const request = httpController.expectOne({
        method: 'GET',
        url: url,
      });

      request.flush(tutors);
    });
})
