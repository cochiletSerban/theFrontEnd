import { ImageService } from './../../../services/image.service';
import { LatLngBounds } from '@agm/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from './../../../models/location';
import { Image } from 'src/app/models/image';
import { Component, OnInit, Input, } from '@angular/core';
import { isAbsolute } from 'path';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() initialImages: Image[];
  @Input() userLocation: Location;
  mapCenter;
  mapCircle = null;

  picturesOnMap: Image[] = [];
  constructor(private locationService: LocationService, private imageService: ImageService) { }

  ngOnInit() {
    this.mapCenter = this.userLocation;
    this.picturesOnMap = this.initialImages;
    console.log(this.picturesOnMap);
  }

  boundsChange(event) {
    this.mapCircle = {
      lon: event.ia.j,
      lat: event.na.j
    };
    console.log(this.mapCircle);

    console.log(this.locationService.getRadiusOfCurrentView(this.mapCenter, {
      lon: event.ia.j,
      lat: event.na.j
    }));

  }

  centerChange(event) {
    this.mapCenter = event;
  }
}

// vreau sa populez harta cu locatiile imaginiilor si id-urile lor pe masura ce dau zoom out
// dupa on mouse over vreau sa aduc imaginea
