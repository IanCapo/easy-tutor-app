import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private _http: any;
  
  constructor(http: HttpClient) {
    this._http = http;
   }


  public getTutors(): Observable<any> {
    const request: Observable<any> = this._http.get(`https://easytutor-prototype-default-rtdb.europe-west1.firebasedatabase.app/tutors.json`);
    return request.pipe(
      map((response: any): void => {
        return response;
      })
    );
  }
}
