import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';

import { switchMap } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-location-feed',
  templateUrl: './location-feed.component.html',
  styleUrls: ['./location-feed.component.scss']
})
export class LocationFeedComponent implements OnInit, OnDestroy {
  images: Image[] = [];
  loading = true;

  constructor(private locationService: LocationService, private imageService: ImageService) {

   }

  ngOnInit() {
    console.log('init');


    this.locationService.getLocation().pipe(switchMap(
      location => this.imageService.getImagesInMyArea(this.locationService.getCoordinatesFromLocation(location))
    )).subscribe(images => this.images = images).add(() => this.loading = false);


    this.locationService.locationChange().pipe(switchMap(
      newLocation => this.imageService.getImagesInMyArea(this.locationService.getCoordinatesFromLocation(newLocation))
    )).subscribe(images => this.images = images).add(() => this.loading = false);

  }


  ngOnDestroy() {
    this.locationService.clearLocationChangeWatch();
  }




}
