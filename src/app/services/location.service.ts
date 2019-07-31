import { Location } from './../models/location';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as geolib from 'geolib';
import { UserService } from './user.service';
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

  constructor(private userService: UserService) {
    this.radius = this.userService.getUserRadius();
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
}
