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

  getPublicImages(skip) {
    return this.http.get<Image[]>(this.apiUrl, { params: {limit: '12', skip} });
  }

}
