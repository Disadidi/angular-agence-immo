import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ma Super Agence';
  isDisabled = false;
  isLoggedIn: boolean;

  constructor(
    private authenticationSvc: AuthenticationService
  ) { }

  ngOnInit(): void {

    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession){
          this.isLoggedIn = true;
          console.log('header.component => Connecté');
        }else{
          this.isLoggedIn = false;
          console.log('header.component => deconnecté');
        }
      }
    )
  }

  deconnexion(): void{
    this.authenticationSvc.sigOutUser();
  }
}
