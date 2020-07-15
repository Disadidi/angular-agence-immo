import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  proprities = [
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

  constructor() { }

  getProperties(){
    return new Promise(
      (resolve, reject) => {
        if (this.proprities && this.proprities.length > 0){
          resolve(this.proprities);
        }else{
          const error = new Error('Properties does not exist or is empty');
          reject(error);
        }
      }
    );
  }

  getSoldValue(index: number): boolean{

    if (index > this.proprities.length){
      return false;
    }else{
      return this.proprities[index].sold;
    }

  }
}
