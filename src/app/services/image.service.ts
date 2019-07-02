
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private publicImages: Image[] = [];

  apiUrl = environment.apiUrl + '/images';
  constructor(private http: HttpClient, private userService: UserService) { }

  getPublicImages(limit, skip, sort?, tag?) {
    skip = skip * limit;
    let params: any;
    params = {limit, skip};

    if (sort) {
      params.sort = sort;
    }

    if (tag) {
      params.tag = tag;
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

  getImagesInMyArea(location) {
    const params = {
      lon: location.lon,
      lat: location.lat,
      radius: this.userService.getUserRadius()
    };
    return this.http.get<Image[]>(this.apiUrl,  {params});
  }

}
