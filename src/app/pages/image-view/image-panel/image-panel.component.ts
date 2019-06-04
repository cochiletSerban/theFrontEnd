import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.scss']
})
export class ImagePanelComponent implements OnInit {
  @Input() image;
  constructor() { }

  ngOnInit() {
  }

}
