import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'theFrontEnd';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

 images;

  ngOnInit() {


    this.http.get('http://localhost:4000/images').subscribe(res => {
      this.images = res;
      console.log(res);

    });

  }
}
