import { Image } from './../../models/image';
import { ImageService } from './../../services/image-service.service';
import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

declare var $: any;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  feedImages: Image[];
  skip = 0;
  loading = true;
  grid;
  private readonly limit = 15;

  public options: NgxMasonryOptions = {
    transitionDuration: '0.3s',
    gutter: 0,
  };

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getPublicImages(this.limit, 0).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });
  }

  onScroll() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.skip++;
    this.imageService.getPublicImages(this.limit, this.skip).subscribe(images => {
      this.feedImages.push(...images);
      this.loading = false;
    });
  }


}
