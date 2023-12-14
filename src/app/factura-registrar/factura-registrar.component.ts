import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { SharedService } from '../services/shared/services/shared.service';
import { FormulariosService } from '../services/formularios.service';
import { ArchivoService } from '../services/archivo/archivo.service';
import { CoordinadorPgnService } from 'src/app/services/tipos/coordinador-pgn.services';
import { SedeEntidadService } from 'src/app/services/tipos/sede-empresa.service';
import { FacturaService } from '../services/shared/services/factura.services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-factura-registrar',
  templateUrl: './factura-registrar.component.html',
  styleUrls: ['./factura-registrar.component.scss'],
  providers: [CurrencyPipe],
})

export class FacturaRegistrarComponent implements OnInit, OnDestroy {
  registerInvoiceForm!: FormGroup;
  subscription: Subscription = new Subscription();
  subscriptionFactura: Subscription = new Subscription();
  originalFormValues: any;
  idRegistro: number = 0;
  endPoint = 'Factura';

  tipoSede: any[] = [];
  sedes: any[] = [];
  entidades: any[] = [];
  tipoEmpresa: any[] = [];
  tipoEmpresaNivel: any[] = [];
  tipoEmpresaSector: any[] = [];
  resultados: any;
  entidadId =0;
  sedeId =0;
  empresasSubscription: Subscription;
  mostrarDetallaFactura: boolean = false;

  constructor(  private sharedService: SharedService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private formulariosService: FormulariosService,
                private archivoService: ArchivoService,
                private popupService: PopupService,
                private coordinadorPgnService: CoordinadorPgnService,
                private sedeEntidadService: SedeEntidadService,
                private facturaService: FacturaService,
                private currencyPipe: CurrencyPipe) 
      {

        this.empresasSubscription = new Subscription();
        console.log("constructor");
        this.registerInvoiceForm = this.formBuilder.group({
          id: new FormControl(this.idRegistro, []),
          sedeId: new FormControl('1', []),
          entidadId: new FormControl('1', []),
          facturaNumero: new FormControl('', [Validators.required]),
          referenciaPago: new FormControl('', [Validators.required]),
          numeroContrato: new FormControl('', [Validators.required]),
          fechaPeriodoFacturaInicio: new FormControl('', [Validators.required]),
          fechaPeriodoFacturaFin: new FormControl('', [Validators.required]),
          fechaEmision: new FormControl('', [Validators.required]),
          fechaOportunoPago: new FormControl('', [Validators.required]),
          valorFactura: new FormControl('', [Validators.required]),
          nota: new FormControl('', []),
          urlFactura: new FormControl('', [Validators.required]),
          archivoOrigen: new FormControl(''),
          fechaUltimoPago: new FormControl('', []),
          valorFacturaUltimoPago: new FormControl('', []),
          usuarioId: new FormControl('1', []),
          fechaCreacion: format(new Date(), 'yyyy/MM/dd :hh:mm:ss'),
          fechaModificacion: format(new Date(), 'yyyy/MM/dd :hh:mm:ss'),
          facturaEstadoId: new FormControl(true, []),
        });
      }

  ngOnInit(): void {
    this.facturaService.obtenerResultados(0, 0);
    this.subscriptionFactura = this.facturaService.resultadosData$.subscribe((data) => {
      if (data && Object.keys(data).length > 0) {
        this.resultados = data; 
        const UltimaFacturaValor = this.resultados.UltimaFactura.valor;
        const Contrato = this.resultados.NumeroDelContrato;
    
        const UltimaFacturaValorFormateado = this.currencyPipe.transform(UltimaFacturaValor, '$', 'symbol', '1.0-0');
        let UltimaFacturaFecha: string;
    
        if (UltimaFacturaValor === 0)
          UltimaFacturaFecha = '';
        else {
          const fecha = new Date(this.resultados.UltimaFactura.fecha);
          UltimaFacturaFecha = fecha.toLocaleDateString();
        }
    
        this.registerInvoiceForm.patchValue({
          numeroContrato: Contrato,
          valorFacturaUltimoPago: UltimaFacturaValorFormateado,
          fechaUltimoPago: UltimaFacturaFecha
        });
      }
    });
    
    this.coordinadorPgnService.obtenerListadoRegistros('/CoordinadorsSede/list/1');
    this.coordinadorPgnService.listadoItems$.subscribe((data) => {
      this.sedes = data;
    });

    this.obtenerListaEmpresasXId(0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionFactura.unsubscribe();
    this.empresasSubscription.unsubscribe();
  }

  onSede(event: any) {
    this.sedeId = event.target.value;
    if (this.sedeId) {
      this.subscription.unsubscribe();
      this.entidades  =[];
      this.obtenerListaEmpresasXId(this.sedeId);
    }
  }

  obtenerListaEmpresasXId(id: number) {
    this.empresasSubscription = this.sedeEntidadService.obtenerEmpresasPorSede('/SedeEntidad/list/' + id)
      .subscribe(
        (data: any[]) => {
          this.entidades = data;
        },
        (error) => {
          if (error.status === 404) {
            this.toastr.error("No se tiene empresa asociada", "Error!");
          } else {
            this.toastr.error("Error inesperado:", "Error!");
          }
        }
      );
  }

  onEntidad(event: any) {
    this.entidadId = event.target.value;
    this.facturaService.obtenerResultados(this.entidadId, this.sedeId);
   }

  //------------------------------------------------------------------------------------------

  guardarRegistro() {
    if (this.idRegistro === 0 || this.idRegistro === undefined) {
      this.AdicionarRegistro();
    } else {
      this.ActualizarRegistro();
    }
  }

  AdicionarRegistro() {
    const formData = new FormData();
    formData.append('files', this.registerInvoiceForm.get('archivoOrigen')!.value);

    this.archivoService.subirArchivo(formData);
    const dataToSend = {
      fechaProximaFecha: new Date(),
      ...this.registerInvoiceForm.value
    };

    delete dataToSend.fechaCreacion;
    delete dataToSend.facturaEstadoId;
    delete dataToSend.fechaModificacion;
    delete dataToSend.archivoOrigen;
    dataToSend.valorFacturaUltimoPago = this.limpiarMonto(dataToSend.valorFacturaUltimoPago);
   
    console.log("dataToSend: ", dataToSend);
   
    this.sharedService.post(this.endPoint, dataToSend).subscribe(
      {
        next: (response) => {
          this.toastr.success('Registro exitoso', 'Éxito');
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.toastr.error(error.error.message, 'Error');
          } else {
            this.toastr.error('Hubo un error', 'Error');
          }
        },
        complete: () => {

        }
      }
    );
  }

  ActualizarRegistro() {
    const jsonPatch: any[] = [];
    this.formulariosService.compareAndGeneratePatch(
      jsonPatch,
      this.registerInvoiceForm.value,
      this.originalFormValues
    );

    this.sharedService
      .patch(this.endPoint, this.idRegistro, jsonPatch)
      .subscribe(
        {
          next: (response) => {
            this.toastr.success('Registros actualizados', 'Exito');
          },
          error: (error) => {
            const errorMessage =
              error?.message ?? 'Mensaje de error predeterminado';
            this.toastr.error(errorMessage, 'Error!');
          },
          complete: () => {

          }
        }
      );
  }

  cambioCampoArchivo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerInvoiceForm.patchValue({
        archivoOrigen: file
      });
    }
  }

  LimpiarFormulario() {
    this.registerInvoiceForm.reset();
    this.idRegistro = 0;
  }

  openPopup() {
    // console.log("Llamado");
    // if (this.idRegistro) {
      // console.log("Llamado");
      this.popupService.open(this.entidadId.toString(), 'Mensaje del Popup');
      this.mostrarDetallaFactura =true;
    // }
  }

  limpiarMonto(monto: string): number {
    let montoSinSigno = monto.replace('$', '');
    montoSinSigno = montoSinSigno.replace(/[,\.]/g, '');
    const montoNumerico = parseFloat(montoSinSigno);
    return isNaN(montoNumerico) ? 0 : montoNumerico;
  }

}
