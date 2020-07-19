import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Subscription } from 'rxjs';
import { Property } from '../interface/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties: Property[] = [];
  //propertiesSubscription: Subscription;

  constructor(private propertySvc: PropertiesService) { }

  ngOnInit(): void {
    this.propertySvc.propertiesSubject.subscribe(
      (data: Property[]) => {
        console.log('Observable recu =>', data);
        this.properties = data;
      }
    );
    this.propertySvc.getProperties();
    console.log("initialisation du tableau");
    this.propertySvc.emitProperties();
  }



  getSoldValue(index: number): string{
    if (this.propertySvc.getSoldValue(index)){
      return 'red';
    }
    else{
      return 'green';
    }
  }

  ngOnDestroy(): void {
    //this.propertiesSubscription.unsubscribe();
  }

}
