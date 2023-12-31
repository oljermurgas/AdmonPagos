import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadObligacionesService {
  url: string = environment.serverUrlAdmonPagos;

  private listadoDataSubject = new BehaviorSubject<any[]>([]);
  listadoData$: Observable<any[]> = this.listadoDataSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any | null>(null);
  itemRegActual$: Observable<any | null> = this.itemRegistroActualSubject.asObservable();

  private resultsSubject = new BehaviorSubject<any[]>([]);
  results$: Observable<any[]> = this.resultsSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoRegistrosPorEntidad(idEntidad: number) {
    this.listadoDataSubject.next([]);
  
    const EndPoint = `/TipoObligacion/entidad/${idEntidad}`;
    this.http.get<any[]>(this.url + EndPoint)
      .pipe(
        catchError((error) => {
          console.error("Error al obtener datos: ", error);
          return []; 
        })
      )
      .subscribe((data) => {
        this.listadoDataSubject.next(data);
      });
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

