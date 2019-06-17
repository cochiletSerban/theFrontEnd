import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  constructor(private elRef: ElementRef, private router: Router) { }

  ngOnInit() {
    $(window).scroll(() => {
      if ($(window).scrollTop() >= 1) {
          $('nav').removeClass('hide-header');
      } else {
          $('nav').addClass('hide-header');
      }
    });
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(this.elRef.nativeElement.querySelector('.sidenav'), {});
  }

  get hideNav() {
    if (this.router.url === '/' || this.router.url === '/signup' ) {
      return true;
    }
    return false;
  }

}
