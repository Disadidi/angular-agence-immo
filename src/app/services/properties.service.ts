import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interface/property';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();
  private urlDataBase = '/properties';
  private dirName = 'images/properties';

  constructor() { }

  emitProperties(): void{
    this.propertiesSubject.next(this.properties);
  }
  saveProperties(): void {
    firebase.database().ref(this.urlDataBase).set(this.properties);
  }

  getProperties(): void{
    firebase.database().ref(this.urlDataBase).on('value', (data) => {
      this.properties = data.val()? data.val() : [] ;
      // TODO verifier si nécessaire d'emettre les données
      this.emitProperties();
    });
  }

  getSoldValue(index: number): boolean{

    if (index > this.properties.length){
      return false;
    }else{
      return this.properties[index].sold;
    }
  }

  // Pour test
  getPropertyByIndex(index: number): Property{

    return this.properties[index];
  }

  getSingleProperty(id: string): Promise<Property>{
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.urlDataBase + '/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createProperty(property: Property ): void{
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index: number): void{

    this.properties[index].photos.forEach(
      (photo) => {
        this.removeFile(photo);
      }
    );
    this.properties.splice(index, 1);
    this.saveProperties();
  }

  updateProperty(property: Property, index: number): void{
    // this.properties[index] = property;
    // this.saveProperties();

    firebase.database().ref(this.urlDataBase + '/' + index).update(property).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile(file: File): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const upload = firebase.storage().ref().child(this.dirName + uniqueId + file.name).put(file);
        // récuperer l'état du chargement
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          // paddinf
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          });
      }
    );
  }

  // pour récupèrer les notification de l'afficher à l'utilisateur on peu utiliser une Promesse
  // TODO: mieux gérer le fonctionnement
  removeFile(fileLink): void {
    const storafeRef = firebase.storage().refFromURL(fileLink);
    storafeRef.delete().then(
      () => {
        console.log('File deleted');
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
    this.saveProperties();
  }
}
