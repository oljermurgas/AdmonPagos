import { Component, OnInit , Input} from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-entidad-poppup',
  templateUrl: './entidad-poppup.component.html',
  styleUrls: ['./entidad-poppup.component.scss']
})

export class EntidadPoppupComponent implements OnInit {
  @Input() entidadid: number = 0;
  isOpen = false;
  title : string ='';
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;
  idRegistrostring: string ='0';
  endPoint="EntidadTipoObligacion"

  tipoObligacion : any [] =[];
  tipoPagoAdmon : any [] =[];
  tipoTarifa : any [] =[];

  private subscription: Subscription;
  private subscriptionForm: Subscription = new Subscription();

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private sedeService: SedeService,
              private sharedService: SharedService,
              private formulariosService: FormulariosService
    ) {
          this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
          this.isOpen = isOpen;
              if (isOpen) {
                    this.idRegistrostring = this.popupService.getPopupTitle();
                    console.log("Empresa es: ", this.idRegistrostring);
              }
          });

          this.form = this.formBuilder.group({
            id:[null],
            tipopagoadmonid:[null],
            tipoobligacionid:[null],
            tipotarifaid: [null],
            periodicidadfactura:[null],
            numeropagoelectronico:[null],
            numerocontrato:[null]
          });
   }

      ngOnInit() {
              this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
                this.isOpen = isOpen;
                if (isOpen) {
                  this.title = this.popupService.getPopupTitle();
                  this.form.reset();
                  }
              });
             
              this.subscriptionForm= this.sedeService.obtenerDatosRegistroObservable$().subscribe(data => {
                if (data && Object.keys(data).length > 0) {
     
                  this.form.patchValue({
                    id:data.id,
                    tipopagoadmonid:data.tipopagoadmonid,
                    tipoobligacionid: data.tipoobligacionid,
                    tipotarifaid: data.tipotarifaid,
                    periodicidadfactura: data.periodicidadfactura,
                    numeropagoelectronico: data.numeropagoelectronico,
                    numerocontrato: data.numerocontrato
                  });
                  this.originalFormValues = { ...this.form.value };
                  this.idRegistro = data.id;
                  this.idRegistrostring =this.idRegistro.toString();
                } else {
                  // Handle cuando no se encuentren datos válidos
                }
              });

              this.sharedService.get('tipopagoadmon').subscribe(data => {
                this.tipoPagoAdmon = data;
              });

              this.sharedService.get('tipotarifa').subscribe(data => {
                this.tipoTarifa = data;
              });

      }


    onAccept() {
      this.GuardarRegistro();
      this.close();
    }

    GuardarRegistro(){
      const id = this.form.get('id')?.value ?? '';
      const tipoobligacionid = this.form.get('tipoobligacionid')?.value ?? '';
      if (this.idRegistro === 0 || (this.idRegistro === undefined)) {
        if ( !isNaN(tipoobligacionid) && parseInt(tipoobligacionid) > 0) {
          this.AdicionarRegistro(); 
        } 
      } 
      else{
          this.ActualizarRegistro(); 
      } 
    }
  
    AdicionarRegistro(){
        if (this.form.get('tipoobligacionid') && this.form.get('tipotarifaid')) {
            const dataToSend = {
              EntidadId: this.entidadid,
              TipoObligacionId: this.form.get('tipoobligacionid')?.value ?? '',
              TipoTarifaId: this.form.get('tipotarifaid')?.value ?? '',
              PeriodicidadFactura: this.form.get('periodicidadfactura')?.value ?? '',
              NumeroPagoElectronico: this.form.get('numeropagoelectronico')?.value ?? '',
              NumeroContrato: this.form.get('numerocontrato')?.value ?? ''
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
      console.log("jsonPatch : ", jsonPatch);
        this.sharedService.patch(this.endPoint, this.idRegistro, jsonPatch).subscribe(
          response => {
            this.sedeService.obtenerListadoRegistros('/' + this.endPoint);
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

    onTipoPagoAdmonChange(event: any) {
      const tipoAdmonId = event.target.value;
    
      if (!isNaN(tipoAdmonId) && parseInt(tipoAdmonId) > 0) {
        this.sharedService.get('tipoobligacion/porid/' + tipoAdmonId).subscribe((data) => {
          this.tipoObligacion = data;
        });
      } else {
        this.tipoObligacion = [];
      }
    }

    recibirDatoEnviado(data: any) {
      if (data) {
        console.log("Recibido :", data);
        this.form.patchValue({
          // id:data.id,
          tipopagoadmonid:data.tipoObligacion.tipoPagoAdmonId,
          tipoobligacionid: data.tipoObligacionId,
          tipotarifaid: data.tipoTarifaId,
          periodicidadfactura: data.periodicidadFactura,
          numeropagoelectronico: data.numeroPagoElectronico,
          numerocontrato: data.numeroContrato

        });
        this.originalFormValues = { ...this.form.value };
        this.idRegistro = data.id;
        this.idRegistrostring =this.idRegistro.toString();
      }
  
    }
}
