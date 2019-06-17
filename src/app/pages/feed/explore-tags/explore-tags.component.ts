import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-explore-tags',
  templateUrl: './explore-tags.component.html',
  styleUrls: ['./explore-tags.component.scss']
})
export class ExploreTagsComponent implements OnInit {

  tags: Tag[] = [];
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags(6).subscribe(tags => {
      this.tags.push(...tags);
      console.log(tags);
    });
  }


}
