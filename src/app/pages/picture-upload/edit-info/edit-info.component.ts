import { Image } from './../../../models/image';
import { ImageUploadService } from './../../../services/image-upload.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { LocationService } from 'src/app/services/location.service';
declare var M: any;
declare var google: any;
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
  @ViewChild('search')  searchElementRef;

  form: FormGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    tags: new FormControl(null),
    location: new FormControl(null),
  });

  images: Image[] = [];
  loading = true;
  uploader;
  geoCoder;

  constructor(private imageUploadService: ImageUploadService, private locationService: LocationService,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    if (this.imageUploadService.getImageLocation()) {
      this.locationService.getAddressFromLocation(this.imageUploadService.getImageLocation())
        .subscribe(address =>  {
          this.form.get('location').patchValue(address);
          this.form.updateValueAndValidity();
          M.updateTextFields();
        });
    }

  }


  ngOnInit() {
    this.uploader = this.imageUploadService.getUploader();
    this.imageUploadService.getUploaderImages().subscribe(res => {
      this.images = res;
    }).add(() => this.loading = false);


    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place = google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });


  }





    // this.imageUploadService.getUploaderImages().subscribe(res => {

    //   this.images = res;



    // }).add(() => this.loading = false);


    // this.uploader.onCompleteItem = (item, response, status) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    // };

    // this.uploader.uploadAll();







  onSubmit() {
    console.log(this.form.value);
  }

}

