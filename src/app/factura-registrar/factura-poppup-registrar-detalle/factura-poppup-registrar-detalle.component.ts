import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChanges, } from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormulariosService } from 'src/app/services/formularios.service';
import { EntidadObligacionesService } from 'src/app/services/shared/entidades/entidad-obligaciones.services';
import { ConceptoFacturacionService } from 'src/app/services/tipos/concepto-facturacion.service';
import { FacturaService } from 'src/app/services/shared/services/factura.services'; 


@Component({
  selector: 'app-factura-poppup-registrar-detalle',
  templateUrl: './factura-poppup-registrar-detalle.component.html',
  styleUrls: ['./factura-poppup-registrar-detalle.component.scss']
})

export class FacturaPoppupRegistrarDetalleComponent implements OnInit, OnChanges, OnDestroy {
  @Input() Facturaid: number = 0;
  @Input() Entidadid: number = 0;

  isOpen = false;
  idRegistro: number = 0;
  idRegistrostring: string = '0';
  endPoint = "factura/detalles/";

  tipoObligacion: any = [];
  tipoObligacionSeleccionado: any;

  tipoConcepto: any = [];
  tipoConceptoSeleccionado: any;

  detalleFacturaConcepto: any[] = []; 
  totalValor: number = 0;

  items: any = [];
  itemsIniciales: any =[];
  formulario: FormGroup;
  formularioTotal: FormGroup;

  originalFormValues: any;


  private subscription: Subscription;
  private empresasSubscription: Subscription;
  private detalleFacturaSubscription: Subscription;
  private destroySubject = new Subject<void>();

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private sharedService: SharedService,
              private entidadObligacionesService: EntidadObligacionesService,
              private conceptoFacturacionService: ConceptoFacturacionService,
              private facturaService: FacturaService,
              private formulariosService: FormulariosService ) 
          {
              
              this.empresasSubscription = new Subscription();
              this.detalleFacturaSubscription = new Subscription();

              this.formulario = this.formBuilder.group({
                  tipoobligacionid: new FormControl('0', []),
                  conceptofacturacionid:new FormControl('0', []),
                  valor:new FormControl('0', [])
              });

              this.formularioTotal = this.formBuilder.group({
                tipoobligacionid: new FormControl('0', [])
              });
              
              this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
                this.isOpen = isOpen;
                if (isOpen) {
                  this.idRegistrostring = this.popupService.getPopupTitle();
                }
              });
    }

  ngOnInit() {
      this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
        this.isOpen = isOpen;
        if (!isOpen) this.close();
      });

      this.conceptoFacturacionService.obtenerListadoRegistros("/TipoConceptoFacturacion");
      this.conceptoFacturacionService.listadoItems$.subscribe((data) => {
        this.items = [];
        this.itemsIniciales = data;
      });

  }


  onTipoObligacionChange(event: any){
    const obtenerAdminPagoId = event.target.selectedOptions[0].getAttribute('data-id');
    this.tipoConceptoSeleccionado = event.target.value;
    this.actualizarListaConFiltro(obtenerAdminPagoId);
  }

  actualizarListaConFiltro(valorAdminPagoId: number) {
    if (this.itemsIniciales && valorAdminPagoId !== null && valorAdminPagoId !== undefined) {
      if (valorAdminPagoId!= 0)
        this.items = this.itemsIniciales.filter((item: {tipoPagoAdmonId: number }) => item.tipoPagoAdmonId == valorAdminPagoId);
      else
        this.items = [];
    } 
    else
    this.items = [];
  }

      GuardarRegistro() {
        if (this.idRegistro === 0 || (this.idRegistro === undefined)) {
          this.AdicionarRegistro();
        }
        else {
          this.ActualizarRegistro();
        }
      }

      ActualizarRegistro() {
        // const jsonPatch: any[] = [];
        // this.formulariosService.compareAndGeneratePatch(jsonPatch, this.formularioasociado.value, this.originalFormValues);
        // this.sharedService.patch(this.endPoint, this.idRegistro, jsonPatch).subscribe(
        //   response => {
        //     this.toastr.success("Registros actualizados", "Exito");
        //     // this.obtenerListaEmpresasXId();
        //   },
        //   error => {
        //     const errorMessage = error?.message ?? 'Mensaje de error predeterminado';
        //     this.toastr.error(errorMessage, "Error!");
        //   }
        // );
      }


      AdicionarRegistro() {
        if (this.idRegistrostring.length > 0) {
            const dataToSend = {
                FacturaTipoObligacionId: this.tipoConceptoSeleccionado,
                TipoConceptoFacturacionId: this.formulario.get('conceptofacturacionid')?.value ?? '',
                Valor: this.formulario.get('valor')?.value ?? '',
            };
            this.idRegistro = 2010;
    
            console.log("dataToSend: ", dataToSend);
            this.sharedService.post(this.endPoint + this.idRegistro, dataToSend).subscribe(
                response => {
                    if (response) {
                        this.toastr.success("Registro exitoso", "Éxito");
                        this.idRegistro =0;
                    }
                },
                error => {
                    if (error.status === 400) {
                        if (error.error && error.error.message) {
                            this.toastr.error(error.error.message, "Error");
                        } else {
                            this.toastr.error("Error en la solicitud", "Error");
                        }
                    } else {
                        this.toastr.error("Error en la solicitud", "Error");
                    }
                }
            );
        }
    }

      eliminarRegistro() {
        // if (confirm('Esta seguro que desea eliminar el registro asociado a : ' + this.entidadNombre + ' ?')) {
        //   this.sharedService.del('SedeEntidad', this.entidadId).subscribe(
        //     data => {
        //       this.toastr.success('Registro Borrado', 'Éxito');
        //       this.obtenerListaEmpresasXId();
        //     },
        //     error => {
        //       if (error.status === 404) {
        //         this.toastr.error('No se encontró el registro', 'Error');
        //       } else if (error.status === 500) {
        //         this.toastr.error('Error interno del servidor', 'Error');
        //       } else if (error.error && error.error.message) {
        //         this.toastr.error(error.error.message, 'Error');
        //       } else {
        //         this.toastr.error('Error en la solicitud', 'Error');
        //       }
        //     }
        //   );
        // }
      }


    ngOnChanges(changes: SimpleChanges) {
      if ((changes['Entidadid']) || (changes['Facturaid'])) {
        this.obtenerListaEmpresasXId();
        this.obtenerListaDetalleFactura();
      }
    }

    obtenerListaEmpresasXId() {
      this.empresasSubscription = this.entidadObligacionesService.obtenerListadoRegistrosPorEntidadActivas('/TipoObligacion/entidad/activas/' + this.Entidadid)
        .subscribe(
          (data: any[]) => {
            this.tipoObligacion = data;
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


    obtenerListaDetalleFactura(){
      // 
      this.Facturaid = 2010;
      console.log("  this.Facturaid  : : >>" ,  this.Facturaid );
      this.detalleFacturaSubscription = this.facturaService.obtenerDetalleFacturaXId('/Factura/FacturaDetalleConcepto/' + this.Facturaid)
      .subscribe(
        (data: any[]) => {
          this.detalleFacturaConcepto = data;
          this.totalValor = this.detalleFacturaConcepto.reduce((total, item) => total + item.valor, 0);
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

  

    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.empresasSubscription.unsubscribe();
      this.destroySubject.next();
      this.destroySubject.complete();
    }

    onCancel() {
      this.close();
    }

    private close() {
      this.ngOnDestroy();
      this.popupService.close();
    }

    onAccept() {
      this.close();
    }
  
}
