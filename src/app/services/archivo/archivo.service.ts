import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private url: string = environment.serverUrlArchivo;

  constructor(private httpClient: HttpClient) { }


  subirArchivo(formData: FormData) {

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    this.httpClient.post<any>(this.url, formData,{ headers: headers }).subscribe(
      {
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => { }
      }
    );
  }
}
