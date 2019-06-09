import { Component, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  lpText = 'welcome';
  images: Image[];

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.images = this.imageService.getStoredPublicImages();
    this.imageService.getPublicImages(15, 0).subscribe(res => {
      this.images.push(...res);
    });
  }

  initSlider(index) {
    if (index === this.images.length - 1) {
      $('.slider').slider({indicators: false, duration: 100, interval: 500});
    }
  }

  getRandomizer(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  }

}
