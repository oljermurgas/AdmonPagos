import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
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


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class SedeService {
//   url: string = environment.serverUrlAdmonPagos;

//   // Utiliza un objeto para almacenar los BehaviorSubject en lugar de un mapa
//   private listadoDataMap: { [key: string]: BehaviorSubject<any[]> } = {};

//   constructor(private http: HttpClient) {}

//   obtenerListadoRegistros(EndPoint: string) {
//     this.http.get<any[]>(this.url + EndPoint)
//       .toPromise()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           // Verificar si data es un array
//           for (const key of Object.keys(this.listadoDataMap)) {
//             const subject = this.listadoDataMap[key];
//             if (subject) {
//               subject.next(data);
//             }
//           }
//         } else {
//           console.error("Data received is not an array.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error: ", error);
//       });
//   }

//   // editarRegistro(registro: any, componentId: string) {
//   //   if (!this.listadoDataMap[componentId]) {
//   //     this.listadoDataMap[componentId] = new BehaviorSubject<any[]>([]);
//   //   }
//   //   this.listadoDataMap[componentId].next(registro);
//   // }
//   // editarRegistro(registro: any, componentId: string) {
//   //   this.listadoDataMap[componentId].next(registro);
//   // }

//   // editarRegistro(registro: any, componentId: string) {
//   //   console.log("Registro: ", registro);
//   //   if (this.listadoDataMap[componentId] === undefined) {
//   //     console.log("Por aca paso");
//   //     this.listadoDataMap[componentId] = new BehaviorSubject<any[]>([]);
//   //   }
    
//   //   this.listadoDataMap[componentId].next(registro);
//   //   console.log(" ===============================================================================");
//   //   console.log(" this.listadoDataMap[componentId] : ", this.listadoDataMap[componentId]);
//   //   console.log(" this.listadoDataMap[componentId].next(registro): ", this.listadoDataMap[componentId].next(registro));
//   //   console.log(" ===============================================================================");
//   // }

//   editarRegistro(registro: any, componentId: string) {
//     console.log("Registro: ", registro);
//     if (this.listadoDataMap[componentId] === undefined) {
//       console.log("Por aquí pasó");
//       this.listadoDataMap[componentId] = new BehaviorSubject<any[]>([]);
//     }
    
//     this.listadoDataMap[componentId].next(registro);
//     console.log(" ===============================================================================");
//     console.log(" this.listadoDataMap[componentId] : ", this.listadoDataMap[componentId]);
//     console.log(" this.listadoDataMap[componentId].next(registro): ", this.listadoDataMap[componentId].next(registro));
//     console.log(" ===============================================================================");
//   }
  
  
  