import { Image } from './../../models/image';
import { ImageService } from './../../services/image-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  image: Image;
  loading = true;
  constructor(
      private activeRoute: ActivatedRoute,
      private imageService: ImageService,
    ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.imageService.getImageById(params.imageId).subscribe(img => {
        this.image = img;
        this.loading = false;
      });
    });
  }

}
