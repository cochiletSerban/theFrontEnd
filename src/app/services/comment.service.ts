import { UserService } from 'src/app/services/user.service';
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

  constructor(private http: HttpClient, private userService: UserService) { }

  getCommentsByImageId(imageId, limit, skip) {
    skip *= limit;
    return this.http.get<Comment[]>(this.apiUrl + '/' + imageId, {params: {limit, skip}});
  }

  postComment(comment) {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  commentAdded(comment: Comment) {
    this.commentAddedSource.next(comment);
  }

  getCommentsInArea(location) {
    const params = {
      lon: location.lon,
      lat: location.lat,
      radius: this.userService.getUserRadius(),
      comments: '3'
    };
    return this.http.get<Comment[]>(environment.apiUrl + '/images',  {params});
  }

}
