import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as geolib from 'geolib';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLocation;
  radius = 200;

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
          window.navigator.geolocation.watchPosition(
                (position) => {
                  console.warn(geolib.getDistance(
                    this.getCoordinatesFromLocation(this.currentLocation),
                    this.getCoordinatesFromLocation(position)
                  ));

                  if (geolib.getDistance(
                      this.getCoordinatesFromLocation(this.currentLocation),
                      this.getCoordinatesFromLocation(position)
                    ) > this.radius) {
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

  getCoordinatesFromLocation(location) {
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
  }


}
