import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  apiUrl = environment.apiUrl + '/tags';
  constructor(private http: HttpClient) { }

  getTags(limit) {
    return this.http.get<Tag[]>(this.apiUrl,  {params: {limit}});
  }
}
