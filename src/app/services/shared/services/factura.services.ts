import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoFacturasSubject = new BehaviorSubject<any[]>([]);
  resultListadoFacturasData$: Observable<any[]> = this.listadoFacturasSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoFacturas(EndPoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + EndPoint);
  }

  editarRegistro(registro: any) {
    this.listadoFacturasSubject.next(registro);
  }

  obtenerListadoFacturaObservable$(): Observable<any[]> {
    return this.resultListadoFacturasData$;
  }
}
