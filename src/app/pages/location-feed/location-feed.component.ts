import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-location-feed',
  templateUrl: './location-feed.component.html',
  styleUrls: ['./location-feed.component.scss']
})
export class LocationFeedComponent implements OnInit {
  images: Image[] = [];
  loading = true;
  constructor(private locationService: LocationService, private imageService: ImageService) { }

  ngOnInit() {
    this.locationService.getPosition().then(location => {
      console.log(location);
      this.imageService.getImagesInMyArea(500, location).subscribe(images => this.images = images).add(() => this.loading = false);
    });
  }

}
