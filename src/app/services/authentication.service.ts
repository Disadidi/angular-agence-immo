import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signUpUser(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve, reject) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (data: any) => {
            console.log('Connecté');
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve, reject) =>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            console.log('Connecté');
            resolve();
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  sigOutUser(): void{
    firebase.auth().signOut();
  }
}
