import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresaNivelService } from 'src/app/services/tipos/empresa-nivel.service';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';

@Component({
  selector: 'app-tipo-empresa-nivel-registrar',
  templateUrl: './tipo-empresa-nivel-registrar.component.html',
  styleUrls: ['./tipo-empresa-nivel-registrar.component.scss']
})
export class TipoEmpresaNivelRegistrarComponent implements OnInit {
  suscription: Subscription = new Subscription;
  form: FormGroup; 
  originalFormValues: any;
  idRegistro: number =0;

  constructor(  private serviceService: EmpresaNivelService,
                private sharedService: SharedService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) {

                  this.form = this.formBuilder.group({
                    id:0,
                    codigo: [null,Validators.required],
                    descripcion: [null, Validators.required],
                    estado:[null],
                    usuarioId:1,
                    fechaRegistro:[null],
                    fechaModificacion:[null] });
    }
//------------------------------------------------------------------------------------------
  ngOnInit(): void {
      this.suscription= this.serviceService.obtenerDatosRegistroObservable$().subscribe(data => {
        if (data && Object.keys(data).length > 0) {
          this.form.patchValue({
            id:data.id,
            codigo: data.codigo,
            descripcion: data.descripcion,
            estado: data.estado,
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
            descripcion: this.form.get('descripcion')?.value ?? ''
          };

          this.sharedService.post('TipoEmpresaNivel', dataToSend).subscribe(response => {
          this.toastr.success("Registros exitoso","Exito");
        });
      }
    }

    ActualizarRegistro(){
      interface ModifiedFields {
          [key: string]: any;
        }
      
      const modifiedFields: ModifiedFields = {};
      for (const key in this.form.value) {
        if (this.form.value[key] !== this.originalFormValues[key]) {
          modifiedFields[key] = this.form.value[key];
        }
      }

      const jsonPatch = [];
        for (const key in this.form.value) {
            if (this.form.value[key] !== this.originalFormValues[key]) {
              jsonPatch.push({ op: 'replace', path: `/${key}`, value: modifiedFields[key] });
            }
        }

        this.sharedService.patch('TipoEmpresaNivel', this.idRegistro, jsonPatch).subscribe(
          response => {
            this.serviceService.obtenerListadoRegistros("/TipoEmpresaNivel");
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
