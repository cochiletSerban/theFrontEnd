import { Image } from './../../models/image';
import { ImageService } from '../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  feedImages: Image[];
  tags: Tag[];
  skip = 0;
  loading = true;
  init = true;
  endOfPages = false;
  grid: any;
  tag: any;
  sortBy = ['rating', 'desc'];
  private readonly limit = 15;

  readonly imageCriteria = [
    { name: 'Most discussed', value: 'comment' },
    { name: 'Top rated', value: 'rating' }
  ];

  readonly dateCriteria = [
    { name: 'Latest', value:  'desc' },
    { name: 'Oldest', value:  'asc'  }
  ];

  public options: NgxMasonryOptions = {
    transitionDuration: '0.3s',
    gutter: 0,
  };

  constructor(private imageService: ImageService, private tagService: TagService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params.tag) {
        combineLatest(this.imageService.getPublicImages(this.limit, 0), this.tagService.getTags(6)).subscribe(res => {
          this.feedImages = res[0];
          this.tags = res[1];
          this.init = false;
          this.loading = false;
        });
      } else {
        this.tag = params.tag;
        combineLatest(this.imageService.getPublicImages(this.limit, 0, undefined, params.tag),
          this.tagService.getTag(params.tag)).subscribe(res => {
          this.feedImages = res[0];
          this.tags = [res[1]];
          this.init = false;
          this.loading = false;
        });
      }
    });


  }

  onScroll() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.skip++;
    this.imageService.getPublicImages(this.limit, this.skip, undefined, this.tag).subscribe(images => {
      if (images.length === 0) {
        this.endOfPages = true;
      }
      this.feedImages.push(...images);
      this.loading = false;
    });
  }

  goToTop() {
    $('.mcontainer').animate({scrollTop: 0}, 1000);
  }

  sorted(sortBy) {

    //let cacat =  {ratingScore : 'desc', createdAt: 'desc'}; // add to back end figure out how to asemble the object

    if (sortBy.value === 'rating' || sortBy.value === 'comment') {
      this.sortBy[0] = sortBy.value;
    } else {
      this.sortBy[1] = sortBy.value;
    }

    this.skip = 0;
    this.loading = true;
    this.imageService.getPublicImages(this.limit, this.skip, this.sortBy, this.tag).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });
  }

}

