import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EntidadService } from 'src/app/services/shared/entidades/entidad.services';
import { SedeEntidadService } from 'src/app/services/tipos/sede-empresa.service';
import { FormulariosService } from 'src/app/services/formularios.service';
import {pipe } from 'rxjs';

@Component({
  selector: 'app-sede-poppup-asociar-empresa',
  templateUrl: './sede-poppup-asociar-empresa.component.html',
  styleUrls: ['./sede-poppup-asociar-empresa.component.scss']
})

export class SedePoppupAsociarEmpresaComponent implements OnInit, OnDestroy {
  @Input() entidadid: number = 0;
  isOpen = false;
  idRegistro: number = 0;
  idRegistrostring: string = '0';
  endPoint = "SedeEntidad";

  items: any = [];
  textoFiltro: string = '';
  itemsIniciales: any = [];
  formulario: FormGroup;
  formularioasociado: FormGroup;
  tiposSeleccionados: string = '';
  itemsEntidades: any = [];
  entidadId: number = 0;
  entidadNombre: string = '';
  originalFormValues: any;

  private subscription: Subscription;
  private empresasSubscription: Subscription;
  private destroySubject = new Subject<void>();

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private entidadService: EntidadService,
              private sedeEntidadService: SedeEntidadService,
              private sharedService: SharedService,
              private formulariosService: FormulariosService) {

          this.empresasSubscription = new Subscription();
          this.formulario = this.formBuilder.group({
            tipopagpadministracionid: [this.tiposSeleccionados],
          });

          this.formularioasociado = this.formBuilder.group({
            id: 0,
            numeroContrato: ['', Validators.required],
            numeroContador: ['', Validators.required]
          });

          this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
            this.isOpen = isOpen;
            if (isOpen) {
              this.idRegistrostring = this.popupService.getPopupTitle();
              this.obtenerListaEmpresasXId();
            }
          });
    }

  ngOnInit() {
      this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
        this.isOpen = isOpen;
        if (!isOpen) this.close();
      });

      this.itemsEntidades=[];
      this.entidadService.obtenerListadoRegistros('/Entidad');
      this.entidadService.listadoData$.subscribe((data: any[]) => {
        this.items = data;
        this.itemsIniciales = this.items;
      });
  }

      obtenerListaEmpresasXId() {
        this.empresasSubscription = this.sedeEntidadService.obtenerEmpresasPorSede('/SedeEntidad/list/' + this.idRegistrostring)
          .subscribe(
            (data: any[]) => {
              this.itemsEntidades = data;
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

      filtrarOpciones(event: Event) {
        const termino = (event.target as HTMLInputElement).value;
        this.textoFiltro = termino;
        if (this.textoFiltro.length > 2)
          this.actualizarListaConFiltro();
        else
          this.items = this.itemsIniciales;
      }

      actualizarListaConFiltro() {
        if (this.itemsIniciales && this.textoFiltro !== null && this.textoFiltro !== undefined) {
          this.items = this.itemsIniciales.filter((item: { nombre: string }) =>
            item.nombre.toLowerCase().includes(this.textoFiltro.toLowerCase())
          );
        }
      }

      registroSeleccionado(tarjeta: any, registroDiv: HTMLElement) {
        const elementos = document.querySelectorAll('.contenedor-item-registro');
        elementos.forEach(elemento => {
          elemento.classList.remove('activo');
        });

        registroDiv.classList.add('activo');
        this.entidadId = tarjeta.id;
        this.idRegistro = 0;
        this.formularioasociado.reset();
      }

      registroSeleccionadoDesasociar(tarjeta: any, registroDiv: HTMLElement) {
        const elementos = document.querySelectorAll('.contenedor-item-registro');
        elementos.forEach(elemento => {
          elemento.classList.remove('activo');
        });

        registroDiv.classList.add('activo');
        this.entidadId = tarjeta.id;
        this.idRegistro = tarjeta.id;
        this.entidadNombre = tarjeta.entidades.nombre;

        this.formularioasociado.patchValue({
          id: tarjeta.id,
          numeroContrato: tarjeta.numeroContrato,
          numeroContador: tarjeta.numeroContador
        });

        this.originalFormValues = { ...this.formularioasociado.value };
        this.idRegistro = tarjeta.id;
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
        const jsonPatch: any[] = [];
        this.formulariosService.compareAndGeneratePatch(jsonPatch, this.formularioasociado.value, this.originalFormValues);
        this.sharedService.patch(this.endPoint, this.idRegistro, jsonPatch).subscribe(
          response => {
            this.toastr.success("Registros actualizados", "Exito");
            this.obtenerListaEmpresasXId();
          },
          error => {
            const errorMessage = error?.message ?? 'Mensaje de error predeterminado';
            this.toastr.error(errorMessage, "Error!");
          }
        );
      }

      AdicionarRegistro() {
        if (this.idRegistrostring.length > 0) {
          const dataToSend = {
            SedeId: this.idRegistrostring,
            EntidadId: this.entidadId,
            NumeroContrato: this.formularioasociado.get('numeroContrato')?.value ?? '',
            NumeroContador: this.formularioasociado.get('numeroContador')?.value ?? '',
          };

          this.sharedService.post('SedeEntidad', dataToSend).subscribe(
            response => {
              if (response){
                this.toastr.success("Registro exitoso", "Éxito");
                this.obtenerListaEmpresasXId();
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
        if (confirm('Esta seguro que desea eliminar el registro asociado a : ' + this.entidadNombre + ' ?')) {
          this.sharedService.del('SedeEntidad', this.entidadId).subscribe(
            data => {
              this.toastr.success('Registro Borrado', 'Éxito');
              this.obtenerListaEmpresasXId();
            },
            error => {
              if (error.status === 404) {
                this.toastr.error('No se encontró el registro', 'Error');
              } else if (error.status === 500) {
                this.toastr.error('Error interno del servidor', 'Error');
              } else if (error.error && error.error.message) {
                this.toastr.error(error.error.message, 'Error');
              } else {
                this.toastr.error('Error en la solicitud', 'Error');
              }
            }
          );
        }
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
