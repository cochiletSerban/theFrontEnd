import { Image } from './../../../models/image';
import { ImageUploadService } from './../../../services/image-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
  name = 'Angular';
  form: FormGroup;
  arr: FormArray;

  images: Image[] = [];
  loading = true;
  uploader;
  geoCoder;

  constructor(private imageUploadService: ImageUploadService, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      // Fetch GeoCoder for reverse geocoding
      this.geoCoder = new google.maps.Geocoder();
      this.getAddress(this.imageUploadService.getImageLocation());

    });
  }


  ngOnInit() {
    // console.log(this.imageUploadService.getImageLocation());
    this.form = this.fb.group({
      arr: this.fb.array([])
    });

    this.uploader = this.imageUploadService.getUploader();

    this.imageUploadService.getUploaderImages().subscribe(res => {
      this.images = res;
      this.images.forEach(img => {
        this.addItem();
      });
    }).add(() => this.loading = false);

  }





    // this.imageUploadService.getUploaderImages().subscribe(res => {

    //   this.images = res;



    // }).add(() => this.loading = false);


    // this.uploader.onCompleteItem = (item, response, status) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    // };

    // this.uploader.uploadAll();





  createItem() {
    return this.fb.group({
      description: [''],
      title: [''],
      location: ['']
    });
  }

  addItem() {
    this.arr = this.form.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getAddress(location) {
    this.geoCoder.geocode({location}, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address);
          // this.form.get('location').patchValue(results[0].formatted_address);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }

    });
  }



}
