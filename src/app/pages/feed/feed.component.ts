import { Image } from './../../models/image';
import { ImageService } from './../../services/image-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feedImages: Image[];
  skip = 0;
  loading = true;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getPublicImages(this.skip).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });

  }

  nextPage() {
    this.loading = true;
    this.skip++;
    this.imageService.getPublicImages(this.skip).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });
  }

  prevPage() {
    this.loading = true;
    this.skip--;
    this.imageService.getPublicImages(this.skip).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });
  }


}
