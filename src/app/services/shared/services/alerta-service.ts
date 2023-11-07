// control-componente-b.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private abrirComponenteBSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.abrirComponenteBSubject.asObservable();
  constructor() {}

  abrirComponenteBPorTiempo(tiempo: number, estado: boolean) {
    this.abrirComponenteBSubject.next(estado);
    setTimeout(() => {
        this.abrirComponenteBSubject.next(false);
      }, tiempo);
  }

  obtenerEstadoComponenteB(): Observable<boolean> {
    return this.abrirComponenteBSubject.asObservable();
  }
}