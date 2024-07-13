import { Component, OnInit } from '@angular/core';
import { FileDetails } from './FileDetails';
import { FileService } from '../../../services/file.service';
import { response } from 'express';
import { error } from 'console';


// interface FileDetails{
//   name: string;
//   size: number;
//   type: string;
//   content: string | ArrayBuffer | null;

// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private fileService: FileService){}

  ngOnInit(): void {
  }

  files: any =[];
  isDragging = false;

  onDragOver(event : DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging= true;
  }

  onDragLeave(event :DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging= false;
  }

  onDrop(event : DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if(event.dataTransfer && event.dataTransfer.files){
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFilesSelected(event : Event){
    const input = event.target as HTMLInputElement;
    if(input.files){
      this.handleFiles(input.files)
    }
  }

  // handleFiles(fileList: FileList): void {
  //   const filesArray = Array.from(fileList);
  //   this.files = filesArray.map(file => ({
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //   }));
  // }

  submit(){
    this.fileService.uploadFiles(this.files).subscribe({
      next: (data: any)=>{
        console.log('upload sucessfully');
      },
      error: (error: any)=>{
        console.log(error);
      }
    }
  );
  }

  handleFiles(fileList: FileList) {
    const filesArray = Array.from(fileList);
    this.files= [];

    filesArray.forEach(file => {
      const reader= new FileReader(); 

      reader.onload = () => {
        this.files.push({
            name: file.name,
            size : file.size,
            type : file.type,
            content: reader.result
          });
          this.files = [...this.files];
      };
      reader.readAsText(file);
    });
  }



}
