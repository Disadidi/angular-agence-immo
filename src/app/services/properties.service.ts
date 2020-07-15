import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      tile: 'Super maison',
      category: 'Maison',
      sold: false,
    },
    {
      tile: 'Petit Appartement',
      category: 'Appartement',
      sold: true,
    },
    {
      tile: 'Belle Villa',
      category: 'Maison',
      sold: false,
    },
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  getProperties(): Observable<any[]> {
    // return new Promise(
    //   (resolve, reject) => {
    //     if (this.proprities && this.proprities.length > 0){
    //       resolve(this.proprities);
    //     }else{
    //       const error = new Error('Properties does not exist or is empty');
    //       reject(error);
    //     }
    //   }
    // );

    return new Observable((observer) => {
      if (this.properties && this.properties.length > 0){
        observer.next(this.properties);
        observer.complete();
      }else{
        const error = new Error('Properties does not exist or is empty');
        observer.error(error);
      }
    });
  }

  getSoldValue(index: number): boolean{

    if (index > this.properties.length){
      return false;
    }else{
      return this.properties[index].sold;
    }

  }
}
