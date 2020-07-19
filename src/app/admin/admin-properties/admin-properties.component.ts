import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from 'src/app/interface/property';


@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {


  propertiesForm: FormGroup;
  //propertiesSubscription: Subscription;
  properties: Property[] = [];
  indexToRemove: number;
  indexToUpdate: number;
  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photosAdded: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private propertiesSvc: PropertiesService
  ) { }

  initPropertiesForm(): void {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: ''
    });
  }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesSvc.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
        console.log('dans admin-properties', data);
      }
    );
    this.propertiesSvc.getProperties();
    // TODO
    // this.propertiesSvc.emitProperties();
  }

  onSubmitPropertiesForm(): void {
    const newProperty: Property = this.propertiesForm.value;
    if (!newProperty.sold){
      newProperty.sold =  false;
    }
    newProperty.photos = this.photosAdded ? this.photosAdded : [];

    if (this.editMode){
      this.propertiesSvc.updateProperty(newProperty, this.indexToUpdate);
    }else{
      this.propertiesSvc.createProperty(this.propertiesForm.value);
    }
    $('#propertiesFormModal').modal('hide');
  }

  resetForm(): void{
    this.propertiesForm.reset();
    this.editMode = false;
    this.photosAdded = [];
  }

  onDeleteProperty(index: number): void{
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty(): void {
    this.propertiesSvc.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  private initialisePropertiesForm(property: Property): void{

    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photosAdded = property.photos ? property.photos : [];
  }

  private findIndexof(property: Property): number{
    const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property){
          return true;
        }
      }
    );
    return index;
  }

  onEditProperty(property: Property): void{
    this.editMode = true;
    $('#propertiesFormModal').modal('show');
    this.initialisePropertiesForm(property);
    this.indexToUpdate = this.findIndexof(property);
  }

  onUploadFile(event): void{
    this.photoUploading = true;

    this.propertiesSvc.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploaded = false;
        this.photoUploaded = true;

        // remettre photoUploaded à false au bout de 5000 secondes
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

  onRemoveAddedPhoto(index: number): void{
    const propertyToUpdate = this.propertiesSvc.getPropertyByIndex(this.indexToUpdate);
    //this.propertiesSvc.removeFile(propertyToUpdate.photos[index]);
    this.propertiesSvc.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }
}
