import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'theFrontEnd';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {


    this.http.get('https://licentabackend.herokuapp.com/images', {responseType: 'blob'}  ).subscribe(res => {
      console.log(res);
    });

  }
}
