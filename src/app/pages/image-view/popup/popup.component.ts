import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() type: string;

  position = '23%';
  isMobile;
  confirmationModal;


  private readonly textLike = {
    title: 'Like this picture?',
    content: 'like'
  };

  private readonly textDislike = {
    title: `Don't like this picture?`,
    content: 'dislike'
  };

  text =  this.textLike;

  constructor(private deviceService: DeviceDetectorService, private router: Router) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    if (this.type === 'dislike') {
      this.position = '58%';
      this.text = this.textDislike;
    } else {
      this.position = '23%';
      this.text = this.textLike;
    }
  }

  ngOnChanges(): void {
    if (this.type === 'dislike') {
      console.log('dis');
      this.position = '58%';
      this.text = this.textDislike;
    }
    if (this.type === 'like') {
      console.log('like');
      this.position = '23%';
      this.text = this.textLike;
    }
  }

  ngAfterViewInit() {
    if (this.isMobile) {
      const modal = document.querySelector('#confirmationModal');
      this.confirmationModal = M.Modal.init(modal);
      this.confirmationModal.open();
    }
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  login() {
    this.router.navigate(['/signup']);
  }

}
