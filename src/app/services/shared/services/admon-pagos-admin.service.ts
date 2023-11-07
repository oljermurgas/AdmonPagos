import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; // Importa el operador map
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdmonPagosAdminService {
  url: string = environment.serverUrlAdmonPagos;  

  private listadoItemsSubject = new BehaviorSubject<any[]>([]);
  listadoItems$ = this.listadoItemsSubject.asObservable();

  private itemRegistroActualSubject = new BehaviorSubject<any[]>([]);
  itemRegActual$ = this.itemRegistroActualSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  obtenerListadoRegistros(EndPoint: string) {
    this.http.get<any[]>(this.url + EndPoint)
      .toPromise()
      .then((data) => {
        if (Array.isArray(data)) { // Verificar si data es un array
          this.listadoItemsSubject.next(data);
        } else {
          console.error("Data received is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
 
    editarRegistro(registro: any){
      this.itemRegistroActualSubject.next(registro);
    }

    obtenerDatosRegistroObservable$(): Observable<any>{
      return this.itemRegistroActualSubject.asObservable();
    }
  
}
