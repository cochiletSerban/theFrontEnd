import { Image } from './../../../models/image';
import { ImageUploadService } from './../../../services/image-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  constructor(private imageUploadService: ImageUploadService, private fb: FormBuilder) {}

  name = 'Angular';
  form: FormGroup;
  arr: FormArray;

  images: Image[] = [];
  loading = true;
  uploader;

  ngOnInit() {
    this.form = this.fb.group({
      arr: this.fb.array([])
    });

    this.uploader = this.imageUploadService.getUploader();

    this.imageUploadService.getUploaderImages().subscribe(res => {
      this.images = res;
      this.images.forEach(img => {
        this.addItem();
      });
    }).add(() => this.loading = false);

  }




    // this.imageUploadService.getUploaderImages().subscribe(res => {

    //   this.images = res;



    // }).add(() => this.loading = false);


    // this.uploader.onCompleteItem = (item, response, status) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    // };

    // this.uploader.uploadAll();





  createItem() {
    return this.fb.group({
      description: [''],
      title: ['']
    });
  }

  addItem() {
    this.arr = this.form.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
    console.log(this.form.value);
  }



}
