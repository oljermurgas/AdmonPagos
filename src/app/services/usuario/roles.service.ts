// import { Injectable } from '@angular/core';
// import { SRoles } from 'src/app/models/SRoles';
// import { HttpClient } from '@angular/common/http'; 
// import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RolesService {
//   myAppUrl: string;
//   myApiUrl: string;
//   list: SRoles[]=[];
//   totalRegistro = 0;
 
//   private actualizarformulario = new BehaviorSubject<SRoles>({} as any);
//   constructor( private http: HttpClient) { 
//     this.myAppUrl=environment.ServidorUrl;
//     this.myApiUrl='api/sroles';
//   }

//   SObternerRegistroT() {
//     this.http.get(this.myAppUrl + this.myApiUrl + '/GetRoles').toPromise()
//                   .then(data => { this.list =data as any[]; this.totalRegistro  = this.list.length;
//                   })
//   }

//   // Obtiene los todos registros por usuario
//   SObternerRegistroTUsuarioRol(id: string): Observable<any>
//   { if(typeof id === 'undefined'){ id='0';  }
//       return this.http.get(this.myAppUrl + this.myApiUrl + "/UsuarioxRoles/" +  id);
//   } 

//   // Obtiene los todos registros por rol
//   SObternerRegistroTRolUsuario(id: string): Observable<any>
//   { if(typeof id === 'undefined'){ id='0';  }
//       return this.http.get(this.myAppUrl + this.myApiUrl + "/GetRolxUsuario/" +  id);
//   } 


//   AsignarRol(datos: any): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl + '/AsociarUserRol', datos);
//   }

//   removeRol(datos: any): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl + '/RemoveRol', datos);
//   }

//    // Guardar los datos de los colores
//    SGuardarRegistroT(datos: any): Observable<SRoles>{
//     return this.http.post<SRoles>(this.myAppUrl + this.myApiUrl + "/Crear", datos);
//   }     
    
//     // Actualizar los datos
//     SActualizarRegistroT(id: string, pdato: any): Observable<any>{
//     return this.http.put(this.myAppUrl + this.myApiUrl + "/" +  id, pdato);
//   }

//    //Traer los datos de la lista
//    SActualizarDatoFormulario(pdato: any){
//     this.actualizarformulario.next(pdato);
//   }

//   //Actualizar Datos Formulario
//   SObternerDatoFormulario$(): Observable<SRoles>{
//     return this.actualizarformulario.asObservable();
//   }

//    // Inactivar los datos
//    SEliminarRegistroT(id: string): Observable<any> {
//     return this.http.delete(this.myAppUrl + this.myApiUrl + "/" + id);
//   }

// }

