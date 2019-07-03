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
  nebunie;
  constructor(private locationService: LocationService, private imageService: ImageService) {

   }

  ngOnInit() {

    // this.locationService.getLocation().subscribe(location => {
    //   this.imageService.getImagesInMyArea(
    //     this.locationService.getCoordinatesFromLocation(location))
    //       .subscribe(images => this.images = images)
    //       .add(() => this.loading = false);
    // });
  
    //  BUG THIS WORKS ONLY WHEN LOADING THE COMPONENT THE FRIST TIME

    this.locationService.locationChange().subscribe(location => {
      this.imageService.getImagesInMyArea(
        this.locationService.getCoordinatesFromLocation(location))
          .subscribe(images => this.images = images)
          .add(() => this.loading = false);
    });
  }


}
