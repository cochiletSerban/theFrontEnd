import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss']
})
export class PictureUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: 'https://licentabackend.herokuapp.com/images/small', itemAlias: 'image',
    authToken: 'Bearer '  + this.authService.getToken()});

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  inputHasfile = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.inputHasfile = true;
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}
