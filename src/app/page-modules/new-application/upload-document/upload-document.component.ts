import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  documentType:any = [
    {value: '12', viewValue: 'Aadhar Card'},
    {value: '13', viewValue: 'PAN Card'}
  ]
  progress: number = 67;
  progressStart:boolean = false;
  public imagePath;
  imgURL: any;
  file:any;
  isFileUpload:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  preview(fileInputEvent) {
    console.log("fileInputEvent- ", fileInputEvent);
    this.isFileUpload = true;
    this.file = fileInputEvent[0];
    if (fileInputEvent.length === 0) return;
    let mimeType = fileInputEvent[0].type;
    var reader = new FileReader();
    this.imagePath = fileInputEvent;
    reader.readAsDataURL(fileInputEvent[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }

}
