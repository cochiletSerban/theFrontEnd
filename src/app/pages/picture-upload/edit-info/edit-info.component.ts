import { switchMap, tap } from 'rxjs/operators';
import { Image } from './../../../models/image';
import { ImageUploadService } from './../../../services/image-upload.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
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
export class EditInfoComponent implements OnInit, AfterViewInit {
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
  lat;
  lon;
  zoom;
  uploadMarker;
  map;

  // iau locatia pt harta si geocode
  // locatie este fie locationService.getCurrentLocation() fie this.imageUploadService.getImageLocation()
  // daca getImageLocation nu e null iau locatia din serviciu creez markerul si geocodeul
  // else fac acelasi lucru dar cu getCurrent location

  constructor(private imageUploadService: ImageUploadService, private locationService: LocationService,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    this.zoom = this.locationService.calculateZoom(window.innerWidth, 100, this.locationService.getCurrentLocation().lat, 1);
    // this.lat = this.locationService.getCurrentLocation().lat;
    // this.lon = this.locationService.getCurrentLocation().lon;

    if (this.imageUploadService.getImageLocation()) {
      this.locationService.getAddressFromLocation(this.imageUploadService.getImageLocation())
        .subscribe(address => {
          this.createMarkerAndPopulateAddress(this.imageUploadService.getImageLocation(), address);
        });
    } else {
      const location = {
        lat: this.locationService.getCurrentLocation().lat,
        lon: this.locationService.getCurrentLocation().lon
      };
      this.locationService.getAddressFromLocation(location).subscribe(address => {
        this.createMarkerAndPopulateAddress(this.imageUploadService.getImageLocation(), address);
      });
    }

 }

 createMarkerAndPopulateAddress(location, address) {
  this.lat = location.lat;
  this.lon = location.lon;
  this.addPoi({lat: this.lat, lng: this.lon});
  this.uploadMarker.addListener('dragend', this.handleMarkerDrag.bind(this));
  this.form.get('location').patchValue(address);
  this.form.updateValueAndValidity();
  M.updateTextFields();
 }

  ngOnInit() {
    this.uploader = this.imageUploadService.getUploader();
    this.imageUploadService.getUploaderImages().subscribe(res => {
      this.images = res;
    }).add(() => this.loading = false);


  }

  mapReady(map) {
    this.map = map;
    // this.addPoi({lat: this.lat, lng: this.lon});
    // this.uploadMarker.addListener('dragend', this.handleMarkerDrag.bind(this));
  }


  handleMarkerDrag(event) {
    this.lat = + event.latLng.lat();
    this.lon = + event.latLng.lng();
    this.locationService.getAddressFromLocation({lat: this.lat, lng: this.lon}).subscribe(address => {
      this.form.get('location').patchValue(address);
      this.form.updateValueAndValidity();
      M.updateTextFields();
    });
  }

  ngAfterViewInit() {
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

          this.lat = place.geometry.location.lat();
          this.lon = place.geometry.location.lng();
          if (this.uploadMarker) {
            this.uploadMarker.setPosition( new google.maps.LatLng( this.lat, this.lon ) );
          }
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

  addPoi(ev) {
    this.uploadMarker = new google.maps.Marker({
      position: new google.maps.LatLng(+ev.lat, +ev.lng),
      map: this.map,
      draggable: true
    });
  }

}

