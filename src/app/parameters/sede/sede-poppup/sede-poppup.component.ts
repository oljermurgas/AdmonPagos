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
                    this.title = 'Titulo';
              }
          });

          this.form = this.formBuilder.group({
            id:[null],
            terceroidentificacion:[null],
            terceronombre:[null],
            terceroapellido: [null],
            terceroemail:[null],
            tercerotelefono:[null],
            documento:[null],
            valor:[null],
            nummes:[null],
            linksecop:[null],
            fechainicio:[null],
            fechafinal:[null],
            estado:[null],
            usuarioId:1,
            comentarios:[null],
            sedeid:[null]
          });

   }

      ngOnInit() {
              this.subscription = this.popupService.isOpen$.subscribe((isOpen) => {
                this.isOpen = isOpen;
                if (isOpen) {
                  this.title = this.popupService.getPopupTitle();
                  }
              });
             
              this.subscriptionForm= this.sedeService.obtenerDatosRegistroObservable$().subscribe(data => {
                if (data && Object.keys(data).length > 0) {

                  this.form.patchValue({
                    id:data.id,
                    terceroidentificacion:data.terceroidentificacion,
                    terceronombre: data.terceronombre,
                    terceroapellido: data.terceroapellido,
                    terceroemail: data.terceroemail,
                    tercerotelefono: data.tercerotelefono,
                    documento: data.documento,
                    valor: data.valor,
                    nummes: data.nummes,
                    linksecop: data.linksecop,
                    fechainicio: data.fechainicio,
                    fechafinal: data.fechafinal,
                    estado: data.estado,
                    usuarioId: data.usuarioId,
                    comentarios:data.comentarios,
                    sedeId:data.sedeid 
                  });
                  this.originalFormValues = { ...this.form.value };
                  this.idRegistro = data.id;
                } else {
                  // Handle cuando no se encuentren datos válidos
                }
              });


      }

    onAccept() {
      this.GuardarRegistro();
      this.close();
    }

    GuardarRegistro(){   
      this.idRegistro=0;
      if (this.idRegistro === 0 || (this.idRegistro === undefined)) {
          this.AdicionarRegistro(); 
      } 
      else{
          this.ActualizarRegistro(); 
      } 
    }
  
    AdicionarRegistro(){
        if (this.form.get('terceroidentificacion') && this.form.get('documento')) {
            const dataToSend = {
              SedeId: this.sedeid,
              TerceroIdentificacion: this.form.get('terceroidentificacion')?.value ?? '',
              TerceroNombres: this.form.get('terceronombre')?.value ?? '',
              TerceroApellidos: this.form.get('terceroapellido')?.value ?? '',
              DocumentoNumero: this.form.get('documento')?.value ?? '',
              valor: this.form.get('valor')?.value ?? '', 
              meses: this.form.get('nummes')?.value ?? '', 
              linksecop: this.form.get('linksecop')?.value ?? '', 
              FechaInicio: this.form.get('fechainicio')?.value ?? '',
              FechaFinal: this.form.get('fechafinal')?.value ?? '',
              Notas: this.form.get('comentarios')?.value ?? ''
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

}
