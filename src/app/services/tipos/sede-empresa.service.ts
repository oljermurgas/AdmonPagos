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
export class SedeEntidadService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoItemsSubject = new BehaviorSubject<any[]>([]);
  listadoItems$ = this.listadoItemsSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any[]>([]);
  itemRegActual$ = this.itemRegistroActualSubject.asObservable();

  constructor(private http: HttpClient) {}

  private entidadesSubject = new BehaviorSubject<any[]>([]);
  entidades$ = this.entidadesSubject.asObservable();

  private destroySubject = new Subject<void>();


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

  private empresasSubject = new BehaviorSubject<any[]>([]);
  empresasData$ = this.empresasSubject.asObservable();

  obtenerEmpresasPorSede(EndPoint: string): Observable<any[]> {
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
          this.empresasSubject.next(data);
          return data;
        } else {
          console.error("Data received is not an array.");
          return [];
        }
      })
    );
  }


  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  editarRegistro(registro: any) {
    this.entidadesSubject.next(registro);
  }

  obtenerDatosRegistroObservable$(): Observable<any> {
    return this.entidadesSubject.asObservable();
  }

  obtenerEmpresasXSedeIdObservable$(): Observable<any> {
    return this.empresasSubject.asObservable();
  }

  
}
