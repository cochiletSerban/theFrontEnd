import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/models/image';


@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() image: Image;
  @Output() loaded: EventEmitter <boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  initGrid() {
    this.loaded.emit(true);
  }

}
