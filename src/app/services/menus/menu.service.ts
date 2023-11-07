import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    url: string = environment.serverUrlAdmonPagos;

    private opcionMenu = new BehaviorSubject<string>(''); // Inicialmente no se selecciona ninguna opción

    getOpcionMenu(): Observable<string> {
        return this.opcionMenu.asObservable();
    }

    setOpcionMenu(opcion: string) {
        this.opcionMenu.next(opcion);
    }
  
}
