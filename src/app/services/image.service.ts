
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

  getPublicImages(limit, skip, sort?) {
    skip = skip * limit;
    let params;
    if (sort) {
     params = {limit, skip, sort};
    } else {
      params = {limit, skip};
    }

    return this.http.get<Image[]>(this.apiUrl,  {params} ).pipe(tap(imgs => this.publicImages = imgs));
  }

  likeImage(image: Image) {
    return this.http.post(this.apiUrl + '/like'  + '/' + image._id, {});
  }

  dislikeImage(image: Image) {
    return this.http.post(this.apiUrl + '/dislike' + '/' + image._id, {});
  }

  resetImageRating(image: Image) {
    return this.http.post(this.apiUrl + '/resetImageRating', {imageId: image._id});
  }

  getImageById(imageId) {
    return this.http.get<Image>(this.apiUrl + '/' + imageId);
  }

}
