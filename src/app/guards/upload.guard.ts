import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ImageUploadService } from '../services/image-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UploadGuard implements  CanActivate {
  constructor(private imageUploadService: ImageUploadService, private router: Router) {}

  canActivate() {
    if (this.imageUploadService.getUploader()) {
      return true;
    } else {
      this.router.navigate(['/upload']);
      return false;
    }
  }

}
