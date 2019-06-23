import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
declare var $: any;
@Component({
  selector: 'app-explore-tags',
  templateUrl: './explore-tags.component.html',
  styleUrls: ['./explore-tags.component.scss']
})
export class ExploreTagsComponent implements OnInit {

  @Input() tags: Tag[];
  constructor(private tagService: TagService) { }

  ngOnInit() {
    if (this.tags.length === 1 && this.tags[0].imageUrl) {
      $('app-explore-tags').css('background-image', 'url(' + this.tags[0].imageUrl + ')');
    }
  }

}
