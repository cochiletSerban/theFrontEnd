import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  apiUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient) { }

  getLandingPageBgs() {
    return this.http.get<Image[]>(this.apiUrl, { params: {limit: '25'} });
  }

  getPublicImages(limit, skip) {
    skip = skip * limit;
    return this.http.get<Image[]>(this.apiUrl, { params: {limit, skip} });
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

}
