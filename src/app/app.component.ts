import { map, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component } from '@angular/core';

export interface Tutor {
  firstName: string;
  lastName: string;
  email: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'easy-tutor-app';
  tutors: any[];
  
  constructor(db: AngularFireDatabase) {  
    const t = db.list('/subjects').snapshotChanges() as Observable<any>

    t.pipe(map(subjects => console.log(subjects))).subscribe()
    
    }
 }
