import { Location } from './../../../models/location';
import { Image } from 'src/app/models/image';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() initialImages: Image[];
  @Input() userLocation: Location;
  constructor() { }

  ngOnInit() {
    console.log(this.userLocation);

  }

}
