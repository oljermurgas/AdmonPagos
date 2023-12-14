import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormulariosService } from 'src/app/services/formularios.service';
import { CoordinadorPgnService } from 'src/app/services/tipos/coordinador-pgn.services';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';

@Component({
  selector: 'app-coordinacion-pgn-registrar',
  templateUrl: './coordinacion-pgn-registrar.component.html',
  styleUrls: ['./coordinacion-pgn-registrar.component.scss']
})
export class CoordinacionPgnRegistrarComponent implements OnInit {

  suscription: Subscription = new Subscription;
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;
  endPoint="Coordinadors";
  acordeonActivo: boolean = false;

  constructor(  private coordinadorPgnService: CoordinadorPgnService,
                private sharedService: SharedService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private formulariosService: FormulariosService) {

                  this.form = this.formBuilder.group({
                    id:0,
                    coodinacion: [null,Validators.required],
                    responsable: [null, Validators.required],
                    email: [null,Validators.required],
                    telefono: [null, Validators.required],
                    jefeCoordinadorNombre: [null, Validators.required],
                    jefeCoordinadorEmail: [null, Validators.required],
                    estado:[null],
                    usuarioId:1,
                    fechaRegistro:[null],
                    fechaModificacion:[null] });
    }
//------------------------------------------------------------------------------------------
  ngOnInit(): void {
      this.suscription= this.coordinadorPgnService.obtenerDatosRegistroObservable$().subscribe(data => {
        if (data && Object.keys(data).length > 0) {
          this.form.patchValue({
            id:data.id,
            coodinacion: data.coodinacion,
            responsable: data.responsable,
            email: data.email,
            telefono: data.telefono,
            estado: data.estado,
            jefeCoordinadorNombre: data.jefeCoordinadorNombre,
            jefeCoordinadorEmail: data.jefeCoordinadorEmail,
            usuarioId: data.usuarioId,
            fechaRegistro: format(new Date(data.fechaCreacion), 'yyyy/MM/dd :hh:mm:ss'), 
            fechaModificacion: format(new Date(data.fechaModificacion), 'yyyy/MM/dd :hh:mm:ss') 
          }); 
          this.originalFormValues = { ...this.form.value };
        } else {
          // this.toastr.success("Los datos del servicio no son válidos o están vacíos.","Mensaje");
        }
         this.idRegistro = data.id;
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
      if (this.form.get('codigo') && this.form.get('descripcion')) {
          const dataToSend = {
            codigo: this.form.get('codigo')?.value ?? '',
            descripcion: this.form.get('descripcion')?.value ?? '',
            jefeCoordinadorNombre: this.form.get('jefeCoordinadorNombre')?.value ?? '',
            jefeCoordinadorEmail: this.form.get('jefeCoordinadorEmail')?.value ?? ''
          };

          this.sharedService.post(this.endPoint, dataToSend).subscribe(response => {
          this.toastr.success("Registros exitoso","Exito");
        });
      }
    }

    ActualizarRegistro(){
      const jsonPatch: any[] = [];
      this.formulariosService.compareAndGeneratePatch(jsonPatch, this.form.value, this.originalFormValues);

        this.sharedService.patch(this.endPoint, this.idRegistro, jsonPatch).subscribe(
          response => {
            this.coordinadorPgnService.obtenerListadoRegistros('/' + this.endPoint);
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

}
