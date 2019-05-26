import { Image } from './../../models/image';
import { ImageService } from './../../services/image-service.service';
import { Component, OnInit } from '@angular/core';
import * as Masonry from 'masonry-layout';
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
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getPublicImages(this.limit, 0).subscribe(images => {
      this.feedImages = images;
    });

  }

  initGrid(i) {
    if (i === this.feedImages.length - 1 ) {
      this.grid = new Masonry( '.grid', {
        gutter: 0,
      });
      this.loading = false;
    }
  }


  nextPage() {
    this.loading = true;
    this.skip++;
    this.imageService.getPublicImages(this.limit, this.skip).subscribe(images => {
      this.feedImages = images;
    });
  }

  prevPage() {
    this.loading = true;
    this.skip--;
    this.imageService.getPublicImages(this.limit, this.skip).subscribe(images => {
      this.feedImages = images;
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
    });
  }


}
