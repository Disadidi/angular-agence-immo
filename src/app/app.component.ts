import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';

  constructor(){
    const firebaseConfig = {
      apiKey: 'AIzaSyAZ3cMdd9i1_hg-a1qM7lKPM6W7TLJvOfQ',
      authDomain: 'monagence-80a15.firebaseapp.com',
      databaseURL: 'https://monagence-80a15.firebaseio.com',
      projectId: 'monagence-80a15',
      storageBucket: 'monagence-80a15.appspot.com',
      messagingSenderId: '503168475879',
      appId: '1:503168475879:web:f8fbf4844012f821bc3842'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
