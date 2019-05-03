import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'theFrontEnd';
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:4000/images', itemAlias: 'image', authToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2NjMzVkYmJkZWYxMDJiMzgwOTY2ZDkiLCJ1c2VybmFtZSI6InNlZnUiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTU1Njg4NzAxNH0.Yl3D0y7oxr5RwTrQ6Cst0GpIQDrwWoiPuIRASHfzbfA'});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;



  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

 images;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };

    this.http.get('http://localhost:4000/images').subscribe(res => {
      this.images = res;
      console.log(res);

    });

  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }







}
