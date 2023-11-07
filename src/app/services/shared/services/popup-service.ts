import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class PopupService {

  constructor(private httpClient: HttpClient) {}

    private isOpenSubject = new BehaviorSubject<boolean>(false);
    isOpen$ = this.isOpenSubject.asObservable();
  
    private popupTitle: string = '';
    private popupMessage: string = '';
    private popupUrl: string = '';
    private popupPeso:string='';
  
    open(title: string, message: string, url?: string, peso?: string) {
      this.popupTitle = title;
      this.popupMessage = message;
      // this.popupUrl = url;
      // this.popupPeso = peso;
      this.isOpenSubject.next(true);
    }
  
    close() {
      this.isOpenSubject.next(false);
    }
  
    getPopupTitle(): string {
      return this.popupTitle;
    }
  
    getPopupMessage(): string {
      return this.popupMessage;
    }
  
    getPopupUrl(): string {
      return this.popupUrl;
    }

    getPeso(): string {
      return this.popupPeso;
    }

    downloadFile() {
      console.log("downloadFile : ");

    }


    descargarDocumento(url: string) {
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = url;
      anchor.download = '';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  
    private extractFileNameFromUrl(url: string): string {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }


  }
  