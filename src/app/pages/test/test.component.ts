import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';

import * as M from 'materialize-css';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  capture = 'capture';
  title = 'piky';
  public uploader: FileUploader = new FileUploader({
    url: 'https://licentabackend.herokuapp.com/images/small', itemAlias: 'image',
      // url: 'http://localhost:4000/images', itemAlias: 'image',
      // url: 'http://localhost:4000/users/avatar', itemAlias: 'image',
    authToken: 'Bearer '  + this.authService.getToken()});

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;



  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthService) {
  }

 images;

  ngOnInit() {
    M.toast({html: 'loading some photos'});

    this.uploader.options.additionalParameter = {
      title: 'swag',
      description: 'cea mai jmen poza',
      private: false,
      lat: 30,
      lon: 30
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };

    this.http.get('https://licentabackend.herokuapp.com/images').subscribe(res => {
      this.images = res;
      console.log(res);

    });

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}
