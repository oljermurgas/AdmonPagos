import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription,  of , forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormulariosService } from 'src/app/services/formularios.service';
import { AdmonPagosAdminService } from 'src/app/services/shared/services/admon-pagos-admin.service';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { EntidadService } from 'src/app/services/shared/entidades/entidad.services';
import { PopupService } from 'src/app/services/shared/services/popup-service';

@Component({
  selector: 'app-entidad-registrar',
  templateUrl: './entidad-registrar.component.html',
  styleUrls: ['./entidad-registrar.component.scss']
})
export class EntidadRegistrarComponent implements OnInit {

  suscription: Subscription = new Subscription;
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;
  endPoint="Entidad"

  tipoDepartamento : any [] =[];
  tipoMunicipio : any [] =[];
  tipoEmpresa : any [] =[];
  tipoEmpresaNivel : any [] =[];
  tipoEmpresaSector : any [] =[];
  selectedMunicipioId: number = 0;

  constructor(  private admonPagosAdminService: AdmonPagosAdminService,
                private sharedService: SharedService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private formulariosService: FormulariosService,
                private entidadService: EntidadService,
                private popupService: PopupService
                // ,
                // private sedeContratoService: SedeContratoService
                ) {

                  this.form = this.formBuilder.group({
                    id:0,
                    identificacion: [null,Validators.required],
                    departamentoId:[null,Validators.required],
                    municipioId:[null,Validators.required],
                    nombre:[null,Validators.required],
                    direccion:[null,Validators.required],
                    tipoempresaid:[null,Validators.required],
                    tipoempresanivelid:[null,Validators.required],
                    tipoempresasectorid:[null,Validators.required],
                    estado:[null],
                    usuarioId:1,
                    fecharegistro:[null],
                    fechamodificacion:[null],
                    periodicidadfactura:[null,Validators.required]
                  });
    }
//------------------------------------------------------------------------------------------
    ngOnInit(): void {
      let data: any; 

        if (this.entidadService.obtenerDatosRegistroObservable$) {
          this.suscription = this.entidadService.obtenerDatosRegistroObservable$().pipe(
            switchMap((responseData) => {
              data = responseData;
              if (data && Object.keys(data).length > 0) {
                return forkJoin([
                  this.sharedService.get('departamento/' + data.departamentoId),
                  of(data) 
                ]);
              } else {
                return of([null, null]); 
              }
            })
          ).subscribe(([depto, data]) => {
            if (depto) {
              this.tipoMunicipio = depto;
              this.selectedMunicipioId = data.municipioId;

              this.form.patchValue({
                id:data.id,
                  identificacion:data.identificacion,
                  departamentoId: data.departamentoId,
                  municipioId: data.municipioId,
                  nombre: data.nombre,
                  direccion: data.direccion,
                  tipoempresaid: data.tipoEmpresaId,
                  tipoempresanivelid: data.tipoEmpresaNivelId,
                  tipoempresasectorid: data.tipoEmpresaSectorId,
                  estado: data.estado,
                  usuarioId: data.usuarioId,
                  fecharegistro: format(new Date(data.fechaCreacion), 'yyyy/MM/dd :hh:mm:ss'), 
                  fechaModificacion: format(new Date(data.fechaModificacion), 'yyyy/MM/dd :hh:mm:ss') ,
                  periodicidadfactura:data.periodicidadFactura
              });
              this.originalFormValues = { ...this.form.value };
              this.idRegistro = data.id;
        
              // const idSede = this.idRegistro ; // Obtén el idSede correspondiente
              // this.sedeContratoService.obtenerListadoRegistrosPorSede(idSede);

            } else {
              // Manejar el caso en el que no hay datos de departamento
              this.idRegistro = 0;
            }
          });

        }

      this.sharedService.get('departamento').subscribe(data => {
        this.tipoDepartamento = data;
      });

      this.sharedService.get('tipoempresa').subscribe(data => {
        this.tipoEmpresa = data;
      });

      this.sharedService.get('tipoempresanivel').subscribe(data => {
        this.tipoEmpresaNivel = data;
      });

      this.sharedService.get('tipoempresasector').subscribe(data => {
        this.tipoEmpresaSector = data;
      });

    }

  ngOnDestroy(){
      this.suscription.unsubscribe();
    }

//------------------------------------------------------------------------------------------
  GuardarRegistro(){   
      if (this.idRegistro === 0 || (this.idRegistro === undefined)) {
          this.AdicionarRegistro(); 
      } 
      else{
          this.ActualizarRegistro(); 
      } 
  }
  
  AdicionarRegistro(){
    if (this.form.get('identificacion') && this.form.get('nombre')) {
      const dataToSend = {
        identificacion: this.form.get('identificacion')?.value ?? '',
        departamentoId: this.form.get('departamentoId')?.value ?? '',
        municipioId: this.form.get('municipioId')?.value ?? '',
        nombre: this.form.get('nombre')?.value ?? '', 
        direccion: this.form.get('direccion')?.value ?? '', 
        tipoempresaid: this.form.get('tipoempresaid')?.value ?? '', 
        tipoempresanivelid: this.form.get('tipoempresanivelid')?.value ?? '',
        tipoempresasectorid: this.form.get('tipoempresasectorid')?.value ?? '',
        periodicidadFactura: this.form.get('periodicidadfactura')?.value ?? '1'
      };
      console.log("dataToSend : ", dataToSend);
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
            this.entidadService.obtenerListadoRegistros('/' + this.endPoint);
            this.toastr.success("Registros actualizados","Exito");
          },
          error => {
            const errorMessage = error?.message ?? 'Mensaje de error predeterminado';
            this.toastr.error(errorMessage,"Error!");
          }
        );
    }

  LimpiarFormulario(){
      this.form.reset();
      this.idRegistro=0
    }

    onDepartamentoChange(event: any) {
      const departamentoId = event.target.value; 
      if (departamentoId) {
        this.sharedService.get('departamento/' + departamentoId).subscribe((data) => {
          this.tipoMunicipio = data;
        });
      } else {
        this.tipoMunicipio = [];
      }
    }

    openPopup(){
      if (this.idRegistro > 0){
        this.popupService.open(this.idRegistro.toString(), 'Mensaje del Popup');

      }
    }

}
