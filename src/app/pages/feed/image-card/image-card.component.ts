import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image-service.service';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() image: Image;
  @Output() loaded: EventEmitter <boolean> = new EventEmitter();

  isLiked = false;
  isDisliked = false;
  isLoading = false;

  constructor(private imageService: ImageService, private authService: AuthService) { }

  ngOnInit() {
     if (this.image.rating.likes.includes(this.authService.getUserId())) {
        this.isLiked = true;
        this.isDisliked = false;
     }
     if (this.image.rating.dislikes.includes(this.authService.getUserId())) {
        this.isLiked = false;
        this.isDisliked = true;
     }
  }

  initGrid() {
    this.loaded.emit(true);
  }

  likeImage() {
    if (this.isLoading) {
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

}
