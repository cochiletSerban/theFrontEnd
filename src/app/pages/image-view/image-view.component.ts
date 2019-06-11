import { Image } from './../../models/image';
import { ImageService } from '../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  image: Image;
  imgLoading = true;
  commsLoading = true;
  comms: Comment[];
  constructor(
      private activeRoute: ActivatedRoute,
      private imageService: ImageService,
      private comentesSerivce: CommentService
    ) {
      this.comentesSerivce.commentAdded$.subscribe(comm => {
        const temp  = [comm];
        temp.push(...this.comms);
        this.comms = temp;
        console.log(this.comms);
      });
    }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.imageService.getImageById(params.imageId).subscribe(img => {
        this.image = img;
        this.imgLoading = false;
      });
      this.comentesSerivce.getCommentsByImageId(params.imageId).subscribe(comms => {
        this.comms = comms;
        this.commsLoading = false;
      });
    });
  }

}
