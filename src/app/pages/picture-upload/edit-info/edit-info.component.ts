import { Image } from './../../../models/image';
import { ImageUploadService } from './../../../services/image-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  constructor(private imageUploadService: ImageUploadService) { }

  uploader;
  images: Image[] = [];
  loading = true;

  ngOnInit() {
    this.uploader = this.imageUploadService.getUploader();
    this.imageUploadService.getUploaderImages().subscribe(res => this.images = res)
      .add(() => this.loading = false);


    // this.uploader.onCompleteItem = (item, response, status) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    // };

    // this.uploader.uploadAll();
  }


  // getUploaderImages() {
  //   return new Promise((resolve, reject) => {

  //     const images: Image[] = [];
  //     this.uploader.queue.forEach((file) => {
  //       const fileReader = new FileReader();
  //       fileReader.readAsDataURL(file._file);
  //       fileReader.onloadend = (e) => {
  //         images.push({
  //           fileName: 'yolo',
  //           picture: String(fileReader.result)
  //         });

  //         if (images.length === this.uploader.queue.length) {
  //           resolve(images);
  //         }

  //       };
  //     });
  //   });
  // }

}
