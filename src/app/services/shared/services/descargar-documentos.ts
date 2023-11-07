import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescargarDocumentosService {

  constructor(private http: HttpClient) { }

  downloadPDF(url: string): Observable<Blob> {
    // Configura las cabeceras HTTP con el encabezado Content-Disposition
    const headers = new HttpHeaders({
      'Content-Disposition': 'attachment; filename="archivo.pdf"'
    });

    // Realiza la solicitud HTTP para descargar el archivo PDF
    return this.http.get(url, {
      responseType: 'blob', // Establece el tipo de respuesta como Blob
      headers: headers // Agrega las cabeceras con Content-Disposition
    });
  }
}
