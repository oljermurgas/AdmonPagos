import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadObligacionesService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoDataSubject = new BehaviorSubject<any[]>([]);
  listadoData$: Observable<any[]> = this.listadoDataSubject.asObservable();

  private listadoDataActivasSubject = new BehaviorSubject<any[]>([]);
  listadoDataActivas$: Observable<any[]> = this.listadoDataSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any | null>(null);
  itemRegActual$: Observable<any | null> = this.itemRegistroActualSubject.asObservable();

  private resultsSubject = new BehaviorSubject<any[]>([]);
  results$: Observable<any[]> = this.resultsSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoRegistrosPorEntidad(EndPoint: string) {
    this.listadoDataSubject.next([]);
  
    // const EndPoint = `/TipoObligacion/entidad/${idEntidad}`;
    this.http.get<any[]>(this.url + EndPoint)
      .pipe(
        catchError((error) => {
          console.error("Error al obtener datos: ", error);
          return []; 
        })
      )
      .subscribe((data) => {
        this.listadoDataSubject.next(data);
        console.log("Data: ", data);
      });
  }

  obtenerListadoRegistrosPorEntidadActivas(EndPoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + EndPoint).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]); // Devuelve un observable vacío en caso de error 404
        } else {
          console.error("Error: ", error);
          return throwError("Hubo un error al obtener los registros.");
        }
      }),
      map((data) => {
        if (Array.isArray(data)) {
          this.listadoDataActivasSubject.next(data);
          return data;
        } else {
          console.error("Data received is not an array.");
          return [];
        }
      })
    );
  }
  

  editarRegistro(registro: any) {
    this.itemRegistroActualSubject.next(registro);
  }

  obtenerDatosRegistroObservable$(): Observable<any | null> {
    return this.itemRegistroActualSubject.asObservable();
  }

  setSearchResults(results: any[]): void {
    this.resultsSubject.next(results);
  }

  getSearchResults(): Observable<any[]> {
    return this.results$;
  }
}

