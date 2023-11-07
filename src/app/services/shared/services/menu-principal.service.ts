// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable,  throwError } from 'rxjs';
// import { Menu } from 'src/app/interfaces/menu.interface';
// import { SharedService } from './shared.service';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class MenuPrincipalService  extends SharedService{
//   errorMsg?: string;

//   constructor(http: HttpClient) {
//     super(http);
//   }

//   // getArbolMenu(): Observable<Menu[]> {
//   //   return this.get(`CajaHerramientas/Nivel/ObtenerMenuNiveles`)
//   //   .pipe(
//   //     catchError(error => {
//   //       if (error.error instanceof ErrorEvent) {
//   //         this.errorMsg = `Error: ${error.error.message}`
//   //       }else {
//   //         this.errorMsg = this.getServerErrorMessage(error)
//   //       }
//   //       return throwError(this.errorMsg)
//   //     })
//   //   );
//   // }


//   private getServerErrorMessage(error: HttpErrorResponse): string {
//     switch (error.status) {
//       case 404: {
//         return `Not Found: ${error.message}`;
//       }
//       case 403: {
//         return `Access Denied: ${error.message}`;
//       }
//       case 500: {
//         return `Internal Server Error: ${error.message}`;
//       }
//       default: {
//         return `Unknown Server Error: ${error.message}`;
//       }
  
//     }
//   }
// }
