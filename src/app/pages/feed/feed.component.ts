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

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getLandingPageBgs().subscribe(res => this.feedImages = res);
  }


}
