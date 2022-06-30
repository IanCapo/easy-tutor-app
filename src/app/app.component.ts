
import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { environment } from 'src/environments/environment';
// import { provideFirebaseApp, getApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { initializeApp } from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-tutor-app';
  // items: Observable<any[]>;
  // constructor(db: AngularFireDatabase ) {
  //   provideFirebaseApp(() => initializeApp(environment.firebase, 'easytutor-app')),
  //   provideFirestore(() => getFirestore())
  //   this.items = db.list('tutors').valueChanges();
  //   this.logChanges();
    
  // }

  // public logChanges() {
  //   console.log(this.items);
  // }
}
