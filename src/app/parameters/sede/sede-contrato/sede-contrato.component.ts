import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { SedeContratoService } from 'src/app/services/shared/sedes/sede-contratos.services';
import { format } from 'date-fns';

@Component({
  selector: 'app-sede-contrato',
  templateUrl: './sede-contrato.component.html',
  styleUrls: ['./sede-contrato.component.scss']
})

export class SedeContratoComponent implements OnInit {
  itemsContratos: any[] = [];
  endPoint: string = 'SedeContrato';
  dateToFormat = new Date();
  formattedDate: string;
  @Output() datoEnviadoMensajeAbrirPoppup = new EventEmitter<boolean>();

  constructor(
    private popupService: PopupService,
    private sedeContratoService: SedeContratoService
  ) { 
    this.formattedDate = format(this.dateToFormat, 'dd/MM/yyyy');

    this.sedeContratoService.listadoData$.subscribe(
      (data: any[]) => {
        this.itemsContratos = data;
      },
      (error: any) => {
        console.error("Error al obtener datos: ", error);
        if (error.status === 404) {
          console.error("Recurso no encontrado");
          // Asigna un array vacío en caso de error 404 o si no se emite ningún valor
          this.itemsContratos = [];
        }
      }
    );
  }

  ngOnInit(): void {
  }

  openPopup(dato?: any ){
    this.datoEnviadoMensajeAbrirPoppup.emit(true);
    if (dato)
      this.popupService.open(dato, 'Mensaje del Popup');
    else
      this.popupService.open('0', 'Mensaje del Popup');
  }

  editar(tarjeta: any) {
    this.openPopup(tarjeta.id); 
    this.datoEnviadoMensajeAbrirPoppup.emit(true);
  }

}
