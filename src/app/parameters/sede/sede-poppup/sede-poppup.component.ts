import { Component, OnInit , Input} from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { CurrencyPipe } from '@angular/common';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormulariosService } from 'src/app/services/formularios.service';
import { SedeContratoService } from 'src/app/services/shared/sedes/sede-contratos.services';

declare var $: any;

@Component({
  selector: 'app-sede-poppup',
  templateUrl: './sede-poppup.component.html',
  styleUrls: ['./sede-poppup.component.scss']
})

export class SedePoppupComponent implements OnInit {
  @Input() sedeid: number = 0;
  isOpen = false;
  title : string ='';
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;
  endPoint="SedeContrato"
  sedeContratoId: number = 0;

  private subscription: Subscription;
  private subscriptionForm: Subscription = new Subscription();

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private sedeService: SedeService,
              private sharedService: SharedService,
              private formulariosService: FormulariosService,
              private currencyPipe: CurrencyPipe,
              private sedeContratoService: SedeContratoService
    ) {

          this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
              this.isOpen = isOpen;
              if (isOpen) {
                  const idSedeContrato = this.popupService.getPopupTitle();
                  this.sedeContratoId = +idSedeContrato;
                  if (isNaN(this.sedeContratoId) ||  this.sedeContratoId ===0) {
                      this.sedeContratoId = 0;
                      this.form.reset();
                  }
                  // Actualizar this.subscriptionForm
                  this.updateSubscriptionForm();
              }
            });

          this.form = this.formBuilder.group({
            id:[null],
            documentonumero:[null],
            fechainicio:[null],
            fechafinal:[null],
            identificacion:[null],
            razonsocial:[null],
            email:[null],
            telefono:[null],
            notas:[null],
            linksecop:[null],
            estado:[null],
            usuarioId:[null],
            valor:[null],
            fecharegistro:[null],
            fechaModificacion:[null] 
          });
   }

      ngOnInit() {
        $('[data-toggle="tooltip"]').tooltip();

        // Mantener this.subscriptionForm actualizado cuando cambia this.subscription
        this.subscriptionForm = this.sedeContratoService.listadoData$
            .pipe(
                map((data: any[]) => {
                    return data.filter(item => item.id === this.sedeContratoId);
                })
            )
            .subscribe((resultadosFiltrados: any[]) => {
                const data = resultadosFiltrados;
                if (data && Object.keys(data).length > 0) {
    
                    this.form.patchValue({
                        documentonumero: data[0].documentoNumero,
                        fechainicio: format(new Date(data[0].fechaInicio), 'dd/MM/yyyy'),
                        fechafinal: format(new Date(data[0].fechaFinal), 'dd/MM/yyyy'),
                        identificacion: data[0].identificacion,
                        razonsocial: data[0].razonSocial,
                        email: data[0].email,
                        telefono: data[0].telefono,
                        notas: data[0].notas,
                        linksecop: data[0].linkSecop,
                        estado: data[0].estado,
                        valor: data[0].valor,
                        fecharegistro: data[0].fechaCreacion,
                        fechaModificacion: data[0].fechaModificacion
                    });
                    this.originalFormValues = { ...this.form.value };
                    this.idRegistro = data[0].id;
                }
            });
      }

    onAccept() {
      this.GuardarRegistro();
      this.close();
    }

    GuardarRegistro(){   
      if (this.idRegistro === 0 || (this.idRegistro === undefined)) {
          this.AdicionarRegistro(); 
      } 
      else{
          this.ActualizarRegistro(); 
      } 
    }
  
    AdicionarRegistro(){
        if (this.form.get('identificacion') && this.form.get('documentonumero')) {
            const dataToSend = {
              SedeId: this.sedeid,
              DocumentoNumero: this.form.get('documentonumero')?.value ?? '',
              FechaInicio: this.form.get('fechainicio')?.value ?? '',
              FechaFinal: this.form.get('fechafinal')?.value ?? '',
              Identificacion: this.form.get('identificacion')?.value ?? '',
              RazonSocial: this.form.get('razonsocial')?.value ?? '',
              Email: this.form.get('email')?.value ?? '',
              Telefono: this.form.get('telefono')?.value ?? '',
              Notas: this.form.get('notas')?.value ?? '',
              linksecop: this.form.get('linksecop')?.value ?? '',
              valor: this.form.get('valor')?.value ?? '',
              estado: this.form.get('estado')?.value ?? ''
            };
            this.sharedService.post(this.endPoint, dataToSend).subscribe(response => {
            this.toastr.success("Registros exitoso","Exito");
            },
            error =>{
              console.log("error : ", error);
            }
          );
        }
    }

    ActualizarRegistro(){
      const jsonPatch: any[] = [];
      this.formulariosService.compareAndGeneratePatch(jsonPatch, this.form.value, this.originalFormValues);
        this.sharedService.patch(this.endPoint, this.idRegistro, jsonPatch).subscribe(
          response => {
            this.sedeService.obtenerListadoRegistros('/Sede');
            this.toastr.success("Registros actualizados","Exito");
          },
          error => {
            const errorMessage = error?.message ?? 'Mensaje de error predeterminado';
            this.toastr.error(errorMessage,"Error!");
          }
        );
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    onCancel() {
      this.close();
    }

    private close() {
      this.popupService.close();
    }

    get valor() {
      return this.form.get('valor');
    }
  
    // Función para formatear el valor a moneda
    get valorFormateado() {
      const valorNumerico = Number(this.valor?.value);
    
      if (!isNaN(valorNumerico)) {
        return valorNumerico.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
      } else {
        return '0';
      }
    }
    
    actualizarValorFormateado() {
      this.valor?.setValue(this.valor.value);
    }
    
    private updateSubscriptionForm() {
      // Actualizar this.subscriptionForm con el nuevo valor de this.sedeContratoId
      this.subscriptionForm.unsubscribe();
  
      this.subscriptionForm = this.sedeContratoService.listadoData$
          .pipe(
              map((data: any[]) => {
                  return data.filter(item => item.id === this.sedeContratoId);
              })
          )
          .subscribe((resultadosFiltrados: any[]) => {
              const data = resultadosFiltrados;
              if (data && Object.keys(data).length > 0) {  
                  this.form.patchValue({
                      documentonumero: data[0].documentoNumero,
                      fechainicio: format(new Date(data[0].fechaInicio), 'dd/MM/yyyy'),
                      fechafinal: format(new Date(data[0].fechaFinal), 'dd/MM/yyyy'),
                      identificacion: data[0].identificacion,
                      razonsocial: data[0].razonSocial,
                      email: data[0].email,
                      telefono: data[0].telefono,
                      notas: data[0].notas,
                      linksecop: data[0].linkSecop,
                      estado: data[0].estado,
                      valor: data[0].valor,
                      fecharegistro: data[0].fechaCreacion,
                      fechaModificacion: data[0].fechaModificacion
                  });
                  this.originalFormValues = { ...this.form.value };
                  this.idRegistro = data[0].id;
              }
          });
  }
}
