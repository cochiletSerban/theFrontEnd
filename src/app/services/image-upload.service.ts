import { Location } from './../models/location';
import { Image } from 'src/app/models/image';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private uploader = null;
  private imageLocation: Location;

  constructor() { }

  setUploader(uploader) {
    this.uploader = uploader;
  }

  getUploader() {
    return this.uploader;
  }

  setImageLocation(location) {
    this.imageLocation = location;
  }

  getImageLocation() {
    return this.imageLocation;
  }

  getUploaderImages() {
    return from(new Promise<Image[]>((resolve, reject) => {
      const images: Image[] = [];
      this.uploader.queue.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file._file);
        fileReader.onloadend = (e) => {
          images.push({
            fileName: 'yolo',
            picture: String(fileReader.result)
          });
          if (images.length === this.uploader.queue.length) {
            resolve(images);
          }
        };
      });
    }));
  }
}
