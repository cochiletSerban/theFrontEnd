import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
declare var $: any;


@Component({
  selector: 'app-location-feed',
  templateUrl: './location-feed.component.html',
  styleUrls: ['./location-feed.component.scss']
})
export class LocationFeedComponent implements OnInit {
  images: Image[] = [];
  loading = true;
  constructor(private locationService: LocationService, private imageService: ImageService) {
    this.locationService.getLocation().subscribe(location => {
      this.imageService.getImagesInMyArea(
        this.locationService.getCoordinatesFromLocation(location))
          .subscribe(images => this.images = images)
          .add(() => this.loading = false);
    });
   }

  ngOnInit() {
    this.locationService.locationChange().subscribe(location => {
      this.imageService.getImagesInMyArea(
        this.locationService.getCoordinatesFromLocation(location))
          .subscribe(images => this.images = images)
          .add(() => this.loading = false);
    });
  }
}
