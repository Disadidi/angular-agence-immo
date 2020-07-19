import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Property } from '../interface/property';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertySvc: PropertiesService) { }

  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('id');
    this.propertySvc.getSingleProperty(index).then(
      (property: Property) => {
        this.property = property;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
