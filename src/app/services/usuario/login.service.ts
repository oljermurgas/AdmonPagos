// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { SLogin } from 'src/app/models/SLogin';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//  myAppUrl: string;
//  myApiUrl: string;

//   constructor(private http: HttpClient) { 
//     this.myAppUrl=environment.ServidorUrl;
//     this.myApiUrl='api/scuentas/login';
//   }

//   login(usuario: SLogin): Observable<any>{
//     return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
//   }

//   setLocalStorage(data: any): void {
//     localStorage.setItem('token', data);
//   }

//   getTokenDecoded(): any {
//   let msj: any ;
//     msj = localStorage.getItem('token');
//     const helper = new JwtHelperService();
//     const decodedToken = helper.decodeToken(msj);
//     return decodedToken;
//   }

//    removeLocalStorage(): void{
//     localStorage.removeItem('token');
//    }

//    getToken(): string{
//     return localStorage.getItem('token');
//    }
// }
