import { Location } from './../models/location';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as geolib from 'geolib';
import { UserService } from './user.service';
import { MapsAPILoader } from '@agm/core';
import { DeviceDetectorService } from 'ngx-device-detector';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLocation = {
    coords: {
      latitude: 420,
      longitude: 69
    }
  };
  radius = 500;
  locationChangeWatch;
  geoCoder;
  isMobile: boolean;

  constructor(private userService: UserService, private mapsAPILoader: MapsAPILoader, private deviceService: DeviceDetectorService) {
    this.radius = this.userService.getUserRadius();
    this.isMobile = this.deviceService.isMobile();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      console.log('nebunie');
    });
  }

  getLocation(): Observable<any> {
    return Observable.create(observer => {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = position;
                    observer.next(position);
                    observer.complete();
                },
                (error) => observer.error(error)
            );
        } else {
            observer.error('Unsupported Browser');
        }
    });
  }

  locationChange(): Observable<any> {
    return Observable.create(observer => {
        if (window.navigator && window.navigator.geolocation) {
         this.locationChangeWatch = window.navigator.geolocation.watchPosition(
                (position) => {
                  if (this.coordinatesInRadius(position)) {
                    observer.next(position);
                    this.currentLocation = position;
                  }
                },
                (error) => observer.error(error)
            );
        } else {
            observer.error('Unsupported Browser');
        }
    });
  }

  getAddressFromLocation(location): Observable<any> {
    console.log(location);
    return Observable.create(observer => {
      this.geoCoder.geocode({location}, (results, status) => {
        if (status === 'OK' && results[0]) {
          observer.next(results[0].formatted_address);
          observer.complete();
        } else {
          observer.error(status);
        }
      });
    });
  }

  getCoordinatesFromLocation(location): Location {
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
  }

  coordinatesInRadius(startCoordinate, endCoordinate = this.currentLocation) {
    return geolib.getDistance(
      this.getCoordinatesFromLocation(endCoordinate),
      this.getCoordinatesFromLocation(startCoordinate)
    ) > this.radius;
  }


  getCurrentLocation(): Location {
    return this.getCoordinatesFromLocation(this.currentLocation);
  }

  clearLocationChangeWatch() {
    window.navigator.geolocation.clearWatch(this.locationChangeWatch);
  }

  getCenterOfMap() {
    return geolib.getBoundsOfDistance(this.getCurrentLocation(), this.radius);
  }

  getRadiusOfCurrentView(mapCenter, mapEdge): Location {
    return  {
      radius: geolib.getDistance(mapCenter, mapEdge, 1),
      lat: mapCenter.lat,
      lon: mapCenter.lon
    };
  }

  calculateZoom(WidthPixel, Ratio, Lat, Length) {
    Length = Length * 1000;
    let k = WidthPixel * 156543.03392 * Math.cos(Lat * Math.PI / 180);
    if (this.isMobile) {
      k = WidthPixel * 306543.03392 * Math.cos(Lat * Math.PI / 180);
    }
    let myZoom = Math.round( Math.log( (Ratio * k) / (Length * 100) ) / Math.LN2 );
    myZoom =  myZoom - 1;
    return(myZoom);
  }
}


