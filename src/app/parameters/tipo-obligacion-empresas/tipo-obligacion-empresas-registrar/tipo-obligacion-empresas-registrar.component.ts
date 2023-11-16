import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormulariosService } from 'src/app/services/formularios.service';
import { EmpresaTipoObligacionService } from 'src/app/services/tipos/empresa-tipo-obligacion.service';
import { TipoPagoAdmonService } from 'src/app/services/tipos/tipo-pago-admon.service';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';

@Component({
  selector: 'app-tipo-obligacion-empresas-registrar',
  templateUrl: './tipo-obligacion-empresas-registrar.component.html',
  styleUrls: ['./tipo-obligacion-empresas-registrar.component.scss']
})
export class TipoObligacionEmpresaRegistrarComponent implements OnInit {
    suscription: Subscription = new Subscription;
    form: FormGroup; 
    originalFormValues: any;
    idRegistro: number =0;
    endPoint="TipoObligacion"

    tiposPagoAdministracion: any[] = [];
  
    constructor(  private empresaTipoObligacionService: EmpresaTipoObligacionService,
                  private tipoPagoAdmonService: TipoPagoAdmonService,
                  private sharedService: SharedService,
                  private formBuilder: FormBuilder,
                  private toastr: ToastrService,
                  private formulariosService: FormulariosService) {
  
                    this.form = this.formBuilder.group({
                      id:0,
                      codigo: [null,Validators.required],
                      descripcion: [null, Validators.required],
                      tipopagpadministracionid: [null, Validators.required],
                      estado:[null],
                      usuarioId:1,
                      fechaRegistro:[null],
                      fechaModificacion:[null] });
      }
  //------------------------------------------------------------------------------------------
    ngOnInit(): void {
      this.tipoPagoAdmonService.obtenerListadoRegistros('/TipoPagoAdmon');

      this.tipoPagoAdmonService.listadoItems$.subscribe((data) => {
        this.tiposPagoAdministracion = data.map(item => ({
          id: item.id,
          descripcion: item.descripcion
        }));
      });

        this.suscription= this.empresaTipoObligacionService.obtenerDatosRegistroObservable$().subscribe(data => {
          if (data && Object.keys(data).length > 0) {
            this.form.patchValue({
              id:data.id,
              codigo: data.codigo,
              descripcion: data.descripcion,
              estado: data.estado,
              usuarioId: data.usuarioId,
              tipopagpadministracionid: data.tipoPagoAdmonId,
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
              tipopagoadmonid:  this.form.get('tipopagpadministracionid')?.value ?? ''
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
              this.empresaTipoObligacionService.obtenerListadoRegistros('/' + this.endPoint);
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
  