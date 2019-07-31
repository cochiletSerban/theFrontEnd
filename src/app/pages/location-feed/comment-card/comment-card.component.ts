import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit, AfterViewInit {
  @Input() comment: Comment;
  isTouch = false;
  constructor(private renderer: Renderer2, elRef: ElementRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  // //  this.isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

  }

  // onHover(element) {
  //   this.renderer.setStyle(element.navtive)
  // }

}
