import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoDataSubject = new BehaviorSubject<any[]>([]);
  listadoData$: Observable<any[]> = this.listadoDataSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any | null>(null);
  itemRegActual$: Observable<any | null> = this.itemRegistroActualSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoRegistros(EndPoint: string) {
    this.http.get<any[]>(this.url + EndPoint)
      .toPromise()
      .then((data) => {
        if (Array.isArray(data)) {
          this.listadoDataSubject.next(data);
        } else {
          console.error("Data received is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  editarRegistro(registro: any) {
    this.itemRegistroActualSubject.next(registro);
  }

  obtenerDatosRegistroObservable$(): Observable<any | null> {
    return this.itemRegistroActualSubject.asObservable();
  }
}
