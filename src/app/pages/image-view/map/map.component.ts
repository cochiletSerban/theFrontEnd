import { UserService } from 'src/app/services/user.service';
import { ImageService } from './../../../services/image.service';
import { LatLngBounds } from '@agm/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from './../../../models/location';
import { Image } from 'src/app/models/image';
import { Component, OnInit, Input, } from '@angular/core';
import { isAbsolute } from 'path';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

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

  boundsChanged: Subject<Location> = new Subject<Location>();
  picturesOnMap: Image[] = [];


  constructor(private locationService: LocationService, private imageService: ImageService, private userService: UserService) {
    this.boundsChanged.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((location => this.imageService.getImagesInMyArea(location)))
      ).subscribe(images => {
        this.picturesOnMap = images;
        console.log(this.picturesOnMap);
      });
    this.topEdge = this.locationService.getCurrentLocation();
    this.bottomEdge = this.locationService.getCurrentLocation();
   }

  ngOnInit() {
    this.mapCenter = this.userLocation;
    this.picturesOnMap = this.initialImages;
    this.zoom = this.calculateZoom(window.innerWidth, 100, this.userLocation.lat, 1);
  }



calculateZoom(WidthPixel, Ratio, Lat, Length) {
    // from a segment Length (km),
    // with size ratio of the segment expected on a map (70%),
    // with a map WidthPixel width in pixels (100px),
    // and a latitude (45°) we can get the best Zoom
    // assume earth is a perfect ball with radius : 6,378,137m and
    //      circumference at the equator = 40,075,016.7 m
    // The full world on google map is available in tiles of 256 px;
    // it has a ratio of 156543.03392 (px/m).
    // For Z = 0;
    // pixel scale at the Lat_level is ( 156543,03392 * cos ( PI * (Lat/180) ))
    // The map scale increases at the rate of square root of Z.
    //
    Length = Length * 1000;                     // Length is in Km
    let k = WidthPixel * 156543.03392 * Math.cos(Lat * Math.PI / 180);        // k = circumference of the world at the Lat_level, for Z=0
    let myZoom = Math.round( Math.log( (Ratio * k) / (Length * 100) ) / Math.LN2 );
    myZoom =  myZoom - 1;                   // Z starts from 0 instead of 1
    // console.log("calculateZoom: width "+WidthPixel+" Ratio "+Ratio+" Lat "+Lat+" length "+Length+" (m) calculated zoom "+ myZoom);

    // not used but it could be useful for some: Part of the world size at the Lat
    const MapDim = k / Math.pow(2, myZoom);
    // console.log("calculateZoom: size of the map at the Lat: "+MapDim + " meters.");
    // console.log("calculateZoom: world circumference at the Lat: " +k+ " meters.");
    return(myZoom);
  }

boundsChange(event) {

    this.bottomEdge.lat = event.na.j;
    this.bottomEdge.lon = event.ia.j;

    const location = this.locationService.getRadiusOfCurrentView(this.mapCenter, this.bottomEdge);

    this.topEdge.radius = location.radius / 2;
    location.radius = location.radius / 2 ;
    console.log(location.radius);
    this.boundsChanged.next(location);
  }

centerChange(event) {
    this.mapCenter.lat = event.lat;
    this.mapCenter.lon = event.lng;
  }

  protected mapReady(map) {
    this.map = map;
    this.map.setCenter({ lat: this.locationService.getCurrentLocation().lat, lng: this.locationService.getCurrentLocation().lon });
  }
}

// vreau sa populez harta cu locatiile imaginiilor si id-urile lor pe masura ce dau zoom out
// dupa on mouse over vreau sa aduc imaginea




