// import { Injectable } from '@angular/core';
// import { SUsuario } from 'src/app/models/SUsuario';
// import { HttpClient } from '@angular/common/http'; 
// import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {
//   myAppUrl: string;
//   myApiUrl: string;
//   list: SUsuario[]=[];
 
//   private actualizarformulario = new BehaviorSubject<SUsuario>({} as any);
//   constructor( private http: HttpClient) { 
//     this.myAppUrl=environment.ServidorUrl;
//     this.myApiUrl='api/scuentas';
//   }

//   SObternerRegistroT() {
//     this.http.get(this.myAppUrl + this.myApiUrl + '/listaUsuarios').toPromise()
//                   .then(data => { this.list =data as any[]; })
//   } 

//   saveUser(susuario: SUsuario): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl + '/Crear', susuario);
//   }

//   changePassword(datos: any): Observable<any>{
//     return this.http.put(this.myAppUrl + this.myApiUrl + '/CambiarPaswword', datos);
//   }

//   loginResetear(datos: any): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl + '/LoginResetear', datos);
//   }

//   removeRol(datos: any): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl + '/LoginResetear', datos);
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
//   SObternerDatoFormulario$(): Observable<SUsuario>{
//     return this.actualizarformulario.asObservable();
//   }

//    // Inactivar los datos
//    SEliminarRegistroT(id: string): Observable<any> {
//     return this.http.delete(this.myAppUrl + this.myApiUrl + "/" + id);
//   }

// }

