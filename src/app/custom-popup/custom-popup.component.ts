import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '../services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared/services/shared.service';
import { ErrorService } from '../services/shared/services/error-service';
import { AlertaService } from '../services/shared/services/alerta-service';
import { DescargarDocumentosService } from '../services/shared/services/descargar-documentos';
// import { DescargarDocumentosService } from 'src/app/shared/services/descargar-documentos';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { AlertaService } from 'src/app/shared/services/alerta-service';
// import { ErrorService } from 'src/app/shared/services/error-service';

@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss']
})

export class CustomPopupComponent implements OnInit {
  title = '';
  message = '';
  url = '';
  peso = '';
  isOpen = false;

  private subscription: Subscription;

  constructor(private popupService: PopupService,
              private sharedService: SharedService,
              private errorService: ErrorService,
              private descargarDocumentosService: DescargarDocumentosService,
              private alertaService: AlertaService
   
  ) {
    this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      if (isOpen) {
        this.title = '';
        this.message = '';
        this.url = '';
        this.peso = '';
      }
    });
  }

  ngOnInit() {
    this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      if (isOpen) {
        this.title = this.popupService.getPopupTitle();
        this.message = this.popupService.getPopupMessage();
        this.url = this.popupService.getPopupUrl();
        this.peso = this.popupService.getPeso();

        if (this.peso !== '0') {
          const pesoNumber = parseInt(this.peso, 10);
          if (!isNaN(pesoNumber)) {
            this.peso = (pesoNumber / 1000000).toFixed(2).toString();
          } else {
            this.peso = '0';
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onAccept() {

    try {
      if (!this.url || this.url.trim() === '' || this.url === '.zip') {
        this.errorService.abrirComponenteBPorTiempo(5000, true);
        this.close();
        return;
      }
      this.sharedService.getFile(this.url).subscribe({
        next: (res: any) => {
          let dataType = res.type;
          let binaryData = [];
          binaryData.push(res);
          const data = URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          const link = document.createElement('a');
          link.href = data;
          link.download = this.url;
          this.alertaService.abrirComponenteBPorTiempo(5000, true);
          link.click();
        },
        error: (e) => console.log("Error file", e),
      })
    } catch (error) {
      this.errorService.abrirComponenteBPorTiempo(5000, true);
    }

   
    this.close();
  }

  onCancel() {
    this.close();
  }

  private close() {
    this.popupService.close();

  }
}
