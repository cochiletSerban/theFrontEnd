import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl + '/comments';
  constructor(private http: HttpClient) { }

  getCommentsByImageId(imageId) {
    return this.http.get<Comment[]>(this.apiUrl + '/' + imageId );
  }
}
