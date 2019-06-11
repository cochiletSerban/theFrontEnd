import { CommentService } from './../../../services/comment.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.scss']
})
export class ImagePanelComponent implements OnInit {
  @Input() image;

  isLiked = false;
  isDisliked = false;
  isLoading = false;
  postComentLoading = false;
  comment: FormGroup;

  constructor(private imageService: ImageService, public authService: AuthService,
    private router: Router, private commentService: CommentService) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace : true };
  }


  ngOnInit() {
    if (this.image.rating.likes.includes(this.authService.getUserId())) {
      this.isLiked = true;
      this.isDisliked = false;
   }
    if (this.image.rating.dislikes.includes(this.authService.getUserId())) {
      this.isLiked = false;
      this.isDisliked = true;
   }
    this.comment = new FormGroup({
      text : new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
    });
  }

  likeImage() {
    if (this.isLoading) {
      return;
    }
    if (!this.authService.isUserLoggedIn()) {
       // display log in pop up
      return;
    }

    this.isLoading =  true;
    if (!this.isLiked) {
      this.imageService.likeImage(this.image).subscribe(res => {
        this.image.rating.dislikes.pop();
        this.image.rating.likes.push(this.authService.getUserId());
        this.isLiked = true;
        this.isDisliked = false;
      }).add(() => this.isLoading = false);
    } else {
      this.imageService.resetImageRating(this.image).subscribe(res => {
        this.image.rating.likes.pop();
        this.isLiked = false;
        this.isDisliked = false;
      }).add(() => this.isLoading = false);
    }
  }


  dislikeImage() {
    if (this.isLoading) {
      return;
    }
    if (!this.authService.isUserLoggedIn()) {
      // display log in pop up
      return;
    }

    this.isLoading =  true;
    if (!this.isDisliked) {
      this.imageService.dislikeImage(this.image).subscribe(res => {
        this.image.rating.likes.pop();
        this.image.rating.dislikes.push(this.authService.getUserId());
        this.isLiked = false;
        this.isDisliked = true;
      }).add(() => this.isLoading = false);
    } else {
      this.imageService.resetImageRating(this.image).subscribe(res => {
        this.image.rating.dislikes.pop();
        this.isLiked = false;
        this.isDisliked = false;
      }).add(() => this.isLoading = false);
    }
  }

  postComment() {
    this.postComentLoading = true;
    if (!this.authService.isUserLoggedIn()) {
      this.postComentLoading = false;
      return;  //TODO add login pop up
    }

    if (this.comment.valid) {
      this.commentService.postComment({imageId: this.image._id, ...this.comment.value})
        .subscribe(comm => {
          this.commentService.commentAdded(comm);
          console.log(this.postComentLoading);
        }).add(() =>  this.postComentLoading = false);
    } else {
      this.postComentLoading = false;
    }

  }


}
