import { Component, OnInit, Input} from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  @Input() tag;

  ngOnInit() {}
  constructor(private router: Router) { }

  goToTag() {
    this.router.navigate(['/explore', this.tag.tag]);
  }
}
