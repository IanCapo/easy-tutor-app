import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';  // Firebase modules for Database, Data list and Single object
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  tutors: AngularFireList<any>;
  private db: any;
  private _http: any;
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(http: HttpClient, db: AngularFireDatabase) {
    this.db = db;
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
