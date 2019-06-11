import { Comment } from './../models/comment';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl + '/comments';

  private commentAddedSource = new Subject<Comment>();
  commentAdded$ = this.commentAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  getCommentsByImageId(imageId) {
    return this.http.get<Comment[]>(this.apiUrl + '/' + imageId );
  }

  postComment(comment) {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  commentAdded(comment: Comment) {
    this.commentAddedSource.next(comment);
  }

}
