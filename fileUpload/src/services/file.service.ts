import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDetails } from '../app/component/home/FileDetails';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'http://localhost:8080/files'

  constructor(private http: HttpClient){

   }

   getData(id : number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
   }

   uploadFiles(files: FileDetails[]){
    const formData: FormData = new FormData();

    files.forEach((file)=>{

      if(file.content!= null){
      const blob= new Blob([file.content],{type: file.type});
      formData.append('file',blob,file.name);
      }
    });

    return this.http.post(`${this.url}/upload`,formData,{
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
      responseType: 'text' as 'json'
    });

   }

}
