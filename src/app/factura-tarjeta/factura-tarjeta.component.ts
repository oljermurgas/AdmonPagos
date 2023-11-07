import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PopupService } from '../services/shared/services/popup-service';
import { FacturaService } from '../services/shared/services/factura.services';
import { format } from 'date-fns';

@Component({
  selector: 'app-factura-tarjeta',
  templateUrl: './factura-tarjeta.component.html',
  styleUrls: ['./factura-tarjeta.component.scss']
})
export class FacturaTarjetaComponent implements OnInit {
  @Input() dato: any = {};
  sede: any =[];
  entidad: any =[];
  facturaEstado: any =[];
  facturasTipoObligacion: any =[];

    idFactura: number = 0;
    nombreSede: string = '';
    nombreEntidad: string = '';

    facturaFechaEmision: any;
    facturaFechaPagoOportuno:any;
    facturaUrl: string ='';
    facturaNota: string ='';
    facturaValor: any;
    imagenTipoObligacion:string ='';

    estadoFacturaActual: string='';
    nombreRecurso ='';
    urlTipoRecurso: string = '';
    fechaVigenciaRecurso: string = '';
    tipoFormatoRecurso: string = '';
    tipoRecurso: string = '';
    iconoTipoFormatoRecurso: string = '';
    imagenTipoRecurso: string = '';
    imagenTipoRecurso1: string = '';
    estadoRecurso: string = '';
    confirmPopupOpened = false;
    botonDescarga = false;
    peso='';
    ubicacion='';

  constructor(private popupService: PopupService,
              private facturaService: FacturaService
    ) { }


    ngOnInit(): void {
      let imageObligacion='';
      if (!this.dato) return;
      this.sede = this.dato.sede;
      this.entidad = this.dato.entidad;
      this.facturaEstado = this.dato.facturaEstado;
      this.facturasTipoObligacion = this.dato.facturasTipoObligacion;

      this.nombreSede = this.sede.nombre;
      this.nombreRecurso = this.sede.nombre  + ' || ' + this.entidad.nombre;

      this.nombreEntidad = this.entidad.nombre;
      this.estadoFacturaActual = this.validarFechaVigencia(this.facturaEstado.codigo, this.dato.fechaPago); 

      this.facturaFechaEmision = this.dato.fechaEmision;
      this.facturaFechaPagoOportuno = this.dato.fechaPago;
      this.facturaValor = this.dato.valorFactura;

      if(this.facturasTipoObligacion.length>0)
        imageObligacion = this.imagenTipoobligacion(this.facturasTipoObligacion[0].tipoObligacion.imagen);
      else
        imageObligacion ='./assets/image/imgaviso.png'
      
      this.imagenTipoObligacion =imageObligacion;
      this.iconoTipoFormatoRecurso='./assets/ico/pdf.svg';
    }


      private validarFechaVigencia(estado: string, fechaEntrada: string): string {
        if (estado === '001') 
          return 'pagada';
      
        if (estado === '002') 
          return 'reclamo';
      
        const fechaActual = new Date();
        const fecha2 = new Date(fechaEntrada);
        const diferenciaEnMilisegundos = fechaActual.getTime() - fecha2.getTime();
        const diferenciaEnDías = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
        
        if(diferenciaEnDías>0)
          return 'pendiente';

        return 'prox vencer';
      }
    
      private imagenTipoobligacion(image?: string): string {
        const url = './assets/image/';
        let imgObligacion = '';

        console.log("image    image   :", image);
        
        if(image){
        return  imgObligacion = url + image + '.jpg';
        }

        if(imgObligacion === '')
          return imgObligacion = url + 'imgaviso.png';
            
        return imgObligacion = url + imgObligacion + '.jpg';
      }

    openPopup(idRegistro: number) {
      console.log("Llamado ++++++++++*****************");
      // this.popupService.open(this.nombreRecurso, 'Mensaje del Popup', this.ubicacion, this.peso);
    }

    closePopup(){ }
}
