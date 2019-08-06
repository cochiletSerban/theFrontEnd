import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        switch (event.url) {
          case '/feed':
            this.pageName = 'Pictures near your location';
            break;
          case '/upload':
            case '/upload/edit-info':
            this.pageName = 'Upload a picture';
            break;
          default:
            this.pageName = 'hidden';
        }
      });
  }

  pageName: string;

  ngOnInit() {

  }

}
