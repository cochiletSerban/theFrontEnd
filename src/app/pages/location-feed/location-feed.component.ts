import { Comment } from './../../models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

declare var $: any;


@Component({
  selector: 'app-location-feed',
  templateUrl: './location-feed.component.html',
  styleUrls: ['./location-feed.component.scss']
})
export class LocationFeedComponent implements OnInit, OnDestroy {
  images: Image[] = [];
  comments: Comment[] = [];
  loading = true;


  constructor(public locationService: LocationService, private imageService: ImageService, private commentService: CommentService) {
    this.locationService.locationChange().subscribe(
      res => console.log(res)
    );

    this.locationService.locationChange().pipe(switchMap(
      location => {
        console.log(location);
        return combineLatest([
        this.imageService.getImagesInMyArea(),
        this.commentService.getCommentsInArea(this.locationService.getCoordinatesFromLocation(location))
      ])}
    )).subscribe(res => { this.images = res[0], this.comments = res[1]; }).add(() => this.loading = false);

  }

  ngOnInit() {
    this.locationService.getLocation().pipe(switchMap(
      location => combineLatest([
        this.imageService.getImagesInMyArea(),
        this.commentService.getCommentsInArea(this.locationService.getCoordinatesFromLocation(location))
      ])
    )).subscribe(res => { this.images = res[0], this.comments = res[1]; }).add(() => this.loading = false);

  }

  ngOnDestroy() {
    this.locationService.clearLocationChangeWatch();
  }

}
