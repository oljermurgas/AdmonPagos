import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorPgnService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoItemsSubject = new BehaviorSubject<any[]>([]);
  listadoItems$ = this.listadoItemsSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any[]>([]);
  itemRegActual$ = this.itemRegistroActualSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoRegistros(EndPoint: string): void {

    this.http.get<any[]>(this.url + EndPoint).pipe(
      catchError((error) => {
        console.error("Error: ", error);
        return throwError("Hubo un error al obtener los registros.");
      }),
      map((data) => {
        if (Array.isArray(data)) {
          this.listadoItemsSubject.next(data);
          return data;
        } else {
          console.error("Data received is not an array.");
          return [];
        }
      })
    ).subscribe();
  }

  editarRegistro(registro: any) {
    this.itemRegistroActualSubject.next(registro);
  }

  obtenerDatosRegistroObservable$(): Observable<any> {
    return this.itemRegistroActualSubject.asObservable();
  }
}
