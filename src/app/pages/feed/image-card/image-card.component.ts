import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit, AfterViewInit {
  @Input() image: Image;

  isLiked = false;
  isDisliked = false;
  isLoading = false;

  constructor(private imageService: ImageService, public authService: AuthService,
              private router: Router, private userService: UserService,
              private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    if (this.image.rating.likes.includes(this.userService.getUserId())) {
      this.isLiked = true;
      this.isDisliked = false;
    }
    if (this.image.rating.dislikes.includes(this.userService.getUserId())) {
      this.isLiked = false;
      this.isDisliked = true;
    }
  }

  likeImage() {
    if (this.isLoading) {
      return;
    }
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/image', this.image._id]);
      return;
    }

    this.isLoading =  true;
    if (!this.isLiked) {
      this.imageService.likeImage(this.image).subscribe(res => {
        this.image.rating.dislikes.pop();
        this.image.rating.likes.push(this.userService.getUserId());
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
      this.router.navigate(['/image', this.image._id]);
      return;
    }

    this.isLoading =  true;
    if (!this.isDisliked) {
      this.imageService.dislikeImage(this.image).subscribe(res => {
        this.image.rating.likes.pop();
        this.image.rating.dislikes.push(this.userService.getUserId());
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

  goToImageView() {
    this.router.navigate(['/image', this.image._id]);
  }

  ngAfterViewInit() {
    if (this.router.url === '/feed') {
      this.renderer.removeClass(this.elRef.nativeElement.querySelector('.card'), 'card-hover'); // 💪 the angular way 💪
    }
    // disable hover effects on feed
  }
}
