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
  sortBy = ['ratingScore', 'desc'];
  showScrollToTop = false;
  private readonly limit = 15;

  readonly imageCriteria = [
    { name: 'Top rated', value: 'ratingScore' },
    { name: 'Most discussed', value: 'numberOfComments' },
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
        combineLatest(this.imageService.getPublicImages(this.limit, 0, this.sortBy), this.tagService.getTags(6)).subscribe(res => {
          this.feedImages = res[0];
          this.tags = res[1];
          this.init = false;
          this.loading = false;
        });
      } else {
        this.tag = params.tag;
        combineLatest(this.imageService.getPublicImages(this.limit, 0, this.sortBy, params.tag),
          this.tagService.getTag(params.tag)).subscribe(res => {
          this.feedImages = res[0];
          this.tags = [res[1]];
          this.init = false;
          this.loading = false;
        });
      }
    });

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 500) {
        this.showScrollToTop = true;
      } else {
        this.showScrollToTop = false;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sorted(sortBy) {

    if (sortBy === 'ratingScore' || sortBy === 'numberOfComments') {
      this.sortBy[0] = sortBy;
    } else {
      this.sortBy[1] = sortBy;
    }

    this.skip = 0;
    this.loading = true;
    this.imageService.getPublicImages(this.limit, this.skip, this.sortBy, this.tag).subscribe(images => {
      this.feedImages = images;
      this.loading = false;
    });
  }

}

