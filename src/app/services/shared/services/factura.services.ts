import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url: string = environment.serverUrlAdmonPagos;

  private resultadosSubject = new BehaviorSubject<any>({});
  resultadosData$: Observable<any> = this.resultadosSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerListadoFacturas(EndPoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + EndPoint);
  }

      obtenerNumeroDelContrato(entidadId: number, sedeId: number): Observable<any> {
        const endPoint = `/Factura/obtenerNumeroDelContrato?entidadId=${entidadId}&sedeId=${sedeId}`;
        return this.http.get(this.url + endPoint, { responseType: 'text' });
      }

      obtenerUltimaFactura(entidadId: number, sedeId: number): Observable<any> {
        const endPoint = `/Factura/obtenerUltimaFactura?entidadId=${entidadId}&sedeId=${sedeId}`;
        return this.http.get<any>(this.url + endPoint);
      }

      obtenerResultados(entidadId: number, sedeId: number): void {
        if (entidadId !== 0 && sedeId !== 0) {
          this.obtenerNumeroDelContrato(entidadId, sedeId).pipe(
                catchError((error) => {
                  console.error('Error al obtener el número del contrato:', error);
                  return of(''); // Devuelve una cadena vacía en caso de error
                })
              ).subscribe(
                   (numeroDelContrato) => {
                          this.obtenerUltimaFactura(entidadId, sedeId).subscribe(
                              (ultimaFactura) => {
                                  const entidadResultadoDTO = {
                                    NumeroDelContrato: numeroDelContrato === 'X' ? '' : numeroDelContrato || '', // Si es 'X', asigna un espacio en blanco; de lo contrario, asigna el valor
                                    UltimaFactura: ultimaFactura
                                  };
                                this.resultadosSubject.next(entidadResultadoDTO);
                              },
                              (error) => {
                                console.error('Error al obtener la última factura:', error);
                                this.resultadosSubject.next({});
                              }
                            );
                        }
                  );
          }
      }


      private listadoDataFacturaDetalleSubject = new BehaviorSubject<any[]>([]);

      obtenerDetalleFacturaXId(EndPoint: string): Observable<any[]> {
        console.log("this.url + EndPoint :", this.url + EndPoint);
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
              this.listadoDataFacturaDetalleSubject.next(data);
              return data;
            } else {
              console.error("Data received is not an array.");
              return [];
            }
          })
        );
      }
  
  editarRegistro(registro: any) {
    // Puedes manejar la lógica de edición aquí si es necesario
  }

  obtenerListadoFacturaObservable$(): Observable<any[]> {
    return new Observable(); // Ajusta según tus necesidades
  }
}
