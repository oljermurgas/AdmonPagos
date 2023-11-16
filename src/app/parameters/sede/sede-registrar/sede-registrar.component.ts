import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of , forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormulariosService } from 'src/app/services/formularios.service';
import { AdmonPagosAdminService } from 'src/app/services/shared/services/admon-pagos-admin.service';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { SedeContratoService } from 'src/app/services/shared/sedes/sede-contratos.services';
import { PopupService } from 'src/app/services/shared/services/popup-service';


@Component({
  selector: 'app-sede-registrar',
  templateUrl: './sede-registrar.component.html',
  styleUrls: ['./sede-registrar.component.scss']
})
export class SedeRegistrarComponent implements OnInit {
  suscription: Subscription = new Subscription;
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;
  endPoint="Sede"
  endPonitContrato='SedeContrato'

  tipoDepartamento : any [] =[];
  tipoMunicipio : any [] =[];
  tipoInmueble : any [] =[];
  tipoVinculacionContractual : any [] =[];
  selectedMunicipioId: number = 0;
  mostrarSedeContrato: boolean ;
  mostrarSedeEntidad: boolean;

  constructor(  private admonPagosAdminService: AdmonPagosAdminService,
                private sharedService: SharedService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private formulariosService: FormulariosService,
                private sedeService: SedeService,
                private sedeContratoService: SedeContratoService,
                private popupService: PopupService
               ) {
                this.mostrarSedeContrato = false;
                this.mostrarSedeEntidad = false;

                   this.form = this.formBuilder.group({
                      id:0,
                      codigo:[null],
                      departamentoId:0,
                      municipioId:0,
                      nombre: [null],
                      direccion:[null],
                      cedulacatastral:[null],
                      matriculainnoviliaria:[null],
                      tipoVinculacionContractualId:[null],
                      tipoInmuebleId:[null],
                      estado:[null],
                      usuarioId:1,
                      fecharegistro:[null],
                      fechaModificacion:[null] 
                    });
    }
//------------------------------------------------------------------------------------------
  ngOnInit(): void {
    let data: any; 

    if (this.sedeService.obtenerDatosRegistroObservable$) {
      this.suscription = this.sedeService.obtenerDatosRegistroObservable$().pipe(
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
            id: data.id,
            codigo: data.identificacionHominis,
            departamentoId: data.departamentoId,
            municipioId: data.municipioId,
            nombre: data.nombre,
            direccion: data.direccion,
            cedulacatastral: data.cedulaCatastral,
            matriculainnoviliaria: data.matriculaInnoviliaria,
            tipoVinculacionContractualId: data.tipoVinculacionContractualId,
            tipoInmuebleId: data.tipoInmuebleId,
            estado: data.estado,
            usuarioId: data.usuarioId,
            fecharegistro: format(new Date(data.fechaCreacion), 'yyyy/MM/dd :hh:mm:ss'),
            fechaModificacion: format(new Date(data.fechaModificacion), 'yyyy/MM/dd :hh:mm:ss')
          });
          this.originalFormValues = { ...this.form.value };
          this.idRegistro = data.id;
    
          const idSede = this.idRegistro ; // Obtén el idSede correspondiente
          this.sedeContratoService.obtenerListadoRegistrosPorSede(idSede);

        } else {
          // Manejar el caso en el que no hay datos de departamento
        }
      });
    }

      this.sharedService.get('departamento').subscribe(data => {
        this.tipoDepartamento = data;
      });

      this.sharedService.get('tipoinmueble').subscribe(data => {
        this.tipoInmueble = data;
      });

      this.sharedService.get('TipoVinculacionContractual').subscribe(data => {
        this.tipoVinculacionContractual = data;
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
      if (this.form.get('codigo') && this.form.get('nombre')) {
          const dataToSend = {
            IdentificacionHominis: this.form.get('codigo')?.value ?? '',
            departamentoId: this.form.get('departamentoId')?.value ?? '',
            municipioId: this.form.get('municipioId')?.value ?? '',
            telefono: '000000',
            nombre: this.form.get('nombre')?.value ?? '', 
            direccion: this.form.get('direccion')?.value ?? '', 
            cedulacatastral: this.form.get('numerocatastro')?.value ?? '',
            MatriculaInnoviliaria: this.form.get('matriculainmoviliaria')?.value ?? '', 
            TipoVinculacionContractualId: this.form.get('tipoVinculacionContractualId')?.value ?? '', 
            TipoInmuebleId: this.form.get('tipoInmuebleId')?.value ?? ''
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
            this.sedeService.obtenerListadoRegistros('/' + this.endPoint);
            this.toastr.success("Registros actualizados","Exito");
          },
          error => {
            // const errorMessage = error?.message ?? 'Mensaje de error predeterminado';
            // this.toastr.error(errorMessage,"Error!");
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
        this.mostrarSedeContrato =false;
        this.mostrarSedeEntidad=true;
        this.popupService.open(this.idRegistro.toString(), 'Mensaje del Popup', 'RegistrarSede');
      }
    }

    recibirDatoEnviado(data: any) {
      this.mostrarSedeContrato =true;
      this.mostrarSedeEntidad=false;
    }

}
