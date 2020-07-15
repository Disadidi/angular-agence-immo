import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties = [];

  constructor(private propertySvc: PropertiesService) { }

  ngOnInit(): void {
    this.propertySvc.getProperties().then(
      (data: any) => {
        console.log(data);
        this.properties = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }



  getSoldValue(index: number): string{
    if (this.propertySvc.getSoldValue(index)){
      return 'red';
    }
    else{
      return 'green';
    }
  }

}
