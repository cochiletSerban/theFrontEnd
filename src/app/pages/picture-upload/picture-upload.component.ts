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
  inputHasfile = false;

  pics = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.inputHasfile = true;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  goToImageEdit() {
    this.uploader.queue.forEach((val, i, array) => {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
          this.pics.push(fileReader.result);
      };
      fileReader.readAsDataURL(val._file);
    });
  }

}
