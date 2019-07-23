import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      console.log(vh);
      window.addEventListener('resize', () => {
        // We execute the same script as before
        vh = window.innerHeight * 0.01;
        console.log(vh);
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }


}
