import { Router } from '@angular/router';
import { ImageUploadService } from './../../../services/image-upload.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from '../../../services/image.service';
import { LatLngBounds } from '@agm/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../../models/location';
import { Image } from 'src/app/models/image';
import { Component, OnInit, Input, Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { isAbsolute } from 'path';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { DeviceDetectorService } from 'ngx-device-detector';
import { stringify } from '@angular/core/src/util';
declare const google: any;
import * as M from 'materialize-css';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  // public darkStyle = [
  //   {
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "hue": "#ff4400"
  //       },
  //       {
  //         "saturation": -100
  //       },
  //       {
  //         "lightness": -4
  //       },
  //       {
  //         "gamma": 0.72
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road",
  //     "elementType": "labels.icon"
  //   },
  //   {
  //     "featureType": "landscape.man_made",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "hue": "#0077ff"
  //       },
  //       {
  //         "gamma": 3.1
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "stylers": [
  //       {
  //         "hue": "#000000"
  //       },
  //       {
  //         "gamma": 0.44
  //       },
  //       {
  //         "saturation": -33
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "poi.park",
  //     "stylers": [
  //       {
  //         "hue": "#44ff00"
  //       },
  //       {
  //         "saturation": -23
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "hue": "#007fff"
  //       },
  //       {
  //         "gamma": 0.77
  //       },
  //       {
  //         "saturation": 65
  //       },
  //       {
  //         "lightness": 99
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "gamma": 0.11
  //       },
  //       {
  //         "weight": 5.6
  //       },
  //       {
  //         "saturation": 99
  //       },
  //       {
  //         "hue": "#0091ff"
  //       },
  //       {
  //         "lightness": -86
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "transit.line",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "lightness": -48
  //       },
  //       {
  //         "hue": "#ff5e00"
  //       },
  //       {
  //         "gamma": 1.2
  //       },
  //       {
  //         "saturation": -23
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "transit",
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "saturation": -64
  //       },
  //       {
  //         "hue": "#ff9100"
  //       },
  //       {
  //         "lightness": 16
  //       },
  //       {
  //         "gamma": 0.47
  //       },
  //       {
  //         "weight": 2.7
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#222222"
  //       }
  //     ]
  //   },
  // ];

  @Input() initialImages: Image[];
  @Input() userLocation: Location;
  mapCenter;
  bottomEdge;
  topEdge;
  map;
  zoom;
  uploadMarker;
  locationUploadModal;
  confirmationModal;
  debug = false;
  canAddMarkers = false;
  boundsChanged: Subject<Location> = new Subject<Location>();
  picturesOnMap: Image[] = [];
  showFinalUploadStep = false;

  constructor(private locationService: LocationService, private imageService: ImageService,
              private userService: UserService,
              private renderer: Renderer2, private elRef: ElementRef,
              private imageUploadService: ImageUploadService, private router: Router ) {
    this.boundsChanged.pipe( debounceTime(300), distinctUntilChanged(),
        switchMap((location => this.imageService.getImagesInMyArea(location)))
      ).subscribe(images => {
        this.picturesOnMap.push(...images);
        this.picturesOnMap = _.uniqBy(this.picturesOnMap, '_id');
      });
    this.topEdge = this.locationService.getCurrentLocation();
    this.bottomEdge = this.locationService.getCurrentLocation();

   }

  ngOnInit() {
    this.mapCenter = this.userLocation;
    this.picturesOnMap = this.initialImages;
    this.zoom = this.locationService.calculateZoom(window.innerWidth, 100, this.userLocation.lat, 1);
  }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(buttons, {
      direction: 'up',
      hoverEnabled: false
    });

    let modal = document.querySelector('#locationUploadModal');
    this.locationUploadModal = M.Modal.init(modal);

    modal = document.querySelector('#confirmationModal');
    this.confirmationModal = M.Modal.init(modal);

  }

  mapReady(map) {
    this.map = map;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('hud'));
  }



  boundsChange(event) {
    this.bottomEdge.lat = event.na.j;
    this.bottomEdge.lon = event.ia.j;

    const location = this.locationService.getRadiusOfCurrentView(this.mapCenter, this.bottomEdge);

    this.topEdge.radius = location.radius / 2;
    location.radius = location.radius / 2 ;
    this.boundsChanged.next(location);
  }

  centerChange(event) {
    this.mapCenter.lat = event.lat;
    this.mapCenter.lon = event.lng;
  }

  addPoi(ev) {
    if (this.canAddMarkers) {
      this.uploadMarker = new google.maps.Marker({
        position: new google.maps.LatLng(+ev.lat, +ev.lng),
        map: this.map,
        draggable: true
      });
      this.canAddMarkers = false;
    }
  }

  goToUserLocation() {
      this.map.setCenter({ lat: this.locationService.getCurrentLocation().lat, lng: this.locationService.getCurrentLocation().lon });
  }

  enableMarkers() {
    this.canAddMarkers = true;
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('agm-map'), 'cursor', 'pointer');
  }

  uploadPicture() { // 1
    this.locationUploadModal.open();
  }

  goToUpload(type?) { // 4
    if (type) {
      this.imageUploadService.setImageLocation(JSON.parse(JSON.stringify(this.uploadMarker.position)));
      this.router.navigate(['/upload']);
      this.showFinalUploadStep = false;
    } else {

      this.imageUploadService.setImageLocation({lat: this.userLocation.lat, lng: this.userLocation.lon});
      this.router.navigate(['/upload']);
    }
    this.showFinalUploadStep = false;
  }

  goToMarkerUpload() { // 3
    this.enableMarkers();
    this.showFinalUploadStep = true;
  }

  confirm() { // 2
    this.confirmationModal.open();
  }

  cancelUpload() { // 4
    if (this.uploadMarker) {
      this.canAddMarkers = false;
      this.uploadMarker.setMap(null);
      this.uploadMarker = null;
    }
    this.showFinalUploadStep = false;
  }

}
