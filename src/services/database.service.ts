import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  database: Observable<any> =  new Observable();
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {
    
   }
    

  
}
