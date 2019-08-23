import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
declare var M: any;
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit {
  @Input() type: string;

  position = '23%';
  isMobile;
  confirmationModal;


  private readonly textLike = {
    title: 'Like this picture?',
    content: 'like'
  };

  private readonly textDislike = {
    title: 'Like this picture?',
    content: 'like'
  };

  text =  this.textLike;

  constructor(private deviceService: DeviceDetectorService) {
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

  ngAfterViewInit() {
    if (this.isMobile) {
      const modal = document.querySelector('#confirmationModal');
      this.confirmationModal = M.Modal.init(modal);
      this.confirmationModal.open();
    }
  }

  signup() {

  }

  login() {

  }

}
