import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-location-feed',
  templateUrl: './location-feed.component.html',
  styleUrls: ['./location-feed.component.scss']
})
export class LocationFeedComponent implements OnInit {

  constructor(private locationService: LocationService, private imageService: ImageService) { }

  ngOnInit() {
    this.locationService.getPosition().then(location => {
      console.log(location);
      this.imageService.getImagesInMyArea(10000, location).subscribe(images => console.log(images));
    });
  }

}
