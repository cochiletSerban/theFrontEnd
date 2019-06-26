import { Component, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  lpText = 'welcome';
  images: Image[] = [];

  @ViewChild('fa1') fa1;
  @ViewChild('fa2') fa2;
  @ViewChild('frunze') frunze;
  @ViewChild('grass') grass;
  @ViewChild('logo') logo;
  @ViewChild('eth') eth;

  constructor(private imageService: ImageService, private render: Renderer2, private ref: ElementRef, private router: Router) {
  }

  ngOnInit() {
    this.render.addClass(this.frunze.nativeElement, 'zoomIn');
    this.render.addClass(this.grass.nativeElement, 'slideInUp');
    this.render.setStyle(this.logo.nativeElement, 'animation', 'pick 1s');
    this.imageService.getPublicImages(15, 0, ['rating', 'desc']).subscribe(res => {
      this.images.push(...res);
    });
  }

  initSlider(index) {
    if (index === this.images.length - 1) {
      $('.slider').slider({indicators: false, duration: 800, interval: 800});
    }
  }

  getRandomizer(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  }

  onHo(hovering: boolean) {
    if (hovering) {
      this.render.setStyle(this.fa1.nativeElement, 'animation', 'spin 1s forwards');
      this.render.setStyle(this.fa2.nativeElement, 'animation', 'spin 1s forwards');
    } else {
      this.render.setStyle(this.fa1.nativeElement, 'animation', 'spinBack 1s forwards');
      this.render.setStyle(this.fa2.nativeElement, 'animation', 'spinBack 1s forwards');
    }
  }

  getStarted() {
    this.router.navigate(['/explore']);
  }


}
