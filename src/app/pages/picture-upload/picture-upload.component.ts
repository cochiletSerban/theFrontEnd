import { Router } from '@angular/router';
import { ImageUploadService } from './../../services/image-upload.service';
import { Image } from 'src/app/models/image';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss']
})
export class PictureUploadComponent implements OnInit {
  apiUrl = environment.apiUrl;
  public uploader: FileUploader = new FileUploader({
    url: this.apiUrl + '/images/small', itemAlias: 'image',
    authToken: 'Bearer '  + this.authService.getToken()});

  public hasBaseDropZoneOver = false;
  inputHasfile = false;

  constructor(private authService: AuthService, private imageUploadService: ImageUploadService,
              private router: Router) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.inputHasfile = true;
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  goToImageEdit() {
    this.imageUploadService.setUploader(this.uploader);
    this.router.navigate(['/upload/edit-info']);
  }

}
