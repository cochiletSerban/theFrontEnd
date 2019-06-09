import { images } from '../../assets/images';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private publicImages: Image[] = [];

  apiUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient) { }

  getPublicImages(limit, skip) {
    skip = skip * limit;
    return this.http.get<Image[]>(this.apiUrl, { params: {limit, skip} }).pipe(tap(imgs => this.publicImages = imgs));
  }

  likeImage(image: Image) {
    return this.http.post(this.apiUrl + '/like', {imageId: image._id});
  }

  dislikeImage(image: Image) {
    return this.http.post(this.apiUrl + '/dislike', {imageId: image._id});
  }

  resetImageRating(image: Image) {
    return this.http.post(this.apiUrl + '/resetImageRating', {imageId: image._id});
  }

  getStoredPublicImages() {
    if (this.publicImages.length === 0) {
      return images;
    }
  }

  getImageById(imageId) {
    return this.http.get<Image>(this.apiUrl + '/' + imageId);
  }

}
