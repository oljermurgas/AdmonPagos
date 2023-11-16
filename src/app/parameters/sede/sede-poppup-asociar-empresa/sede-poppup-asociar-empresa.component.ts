import { Component, OnInit , Input} from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EntidadService } from 'src/app/services/shared/entidades/entidad.services';
import { SedeEntidadService } from 'src/app/services/tipos/sede-empresa.service';

@Component({
  selector: 'app-sede-poppup-asociar-empresa',
  templateUrl: './sede-poppup-asociar-empresa.component.html',
  styleUrls: ['./sede-poppup-asociar-empresa.component.scss']
})

export class SedePoppupAsociarEmpresaComponent implements OnInit {
  @Input() entidadid: number = 0;
  isOpen = false;

  idRegistro: number =0;
  idRegistrostring: string ='0';
  endPoint="SedeEntidad"

  items: any =[];
  textoFiltro: string ='';
  itemsIniciales: any =[];
  formulario: FormGroup;
  formularioasociado: FormGroup;
  tiposSeleccionados: string = '';

  itemsEntidades: any =[];

  private subscription: Subscription;

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private entidadService: EntidadService,
              private sedeEntidadService: SedeEntidadService,
              private sharedService: SharedService) 
        {

        this.formulario = this.formBuilder.group({
          tipopagpadministracionid: [this.tiposSeleccionados],
        });

        this.formularioasociado = this.formBuilder.group({
          // tipopagpadministracionid: [this.tiposSeleccionados],
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
             if (!isOpen) 
                   this.close();
              });
             
              this.entidadService.obtenerListadoRegistros('/Entidad');
              this.entidadService.listadoData$.subscribe((data: any[]) => {
                this.items = data;
                this.itemsIniciales = this.items;
              });

              this.obtenerListaEmpresasXId();
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

    adicionarRegistro(tarjeta: any) {      
        if (this.idRegistrostring.length > 0) {
          const dataToSend = {
              SedeId:this.idRegistrostring,
              EntidadId: tarjeta.id
            };
          this.sharedService.post('SedeEntidad', dataToSend).subscribe(response => {
          this.toastr.success("Registros exitoso","Exito");
          this.obtenerListaEmpresasXId();
        });
      }
    }

    eliminarRegistro(tarjeta: any){
      console.log("Eliminar registro : ", tarjeta); 
      if (confirm('Esta seguro que desea elimanar el registro ?')) {
            this.sharedService.del('SedeEntidad', tarjeta.id).subscribe(data => {
            this.obtenerListaEmpresasXId();   
            this.toastr.success('Mensaje','Registro Borrado');
          },);
        }
    }

    obtenerListaEmpresasXId(){
        this.sedeEntidadService.obtenerListadoRegistros('/SedeEntidad/list/' + this.idRegistrostring);
          this.sedeEntidadService.listadoItems$.subscribe((data) => {
          this.itemsEntidades = data;
        });
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

    onAccept() {
      this.close();
    }


}
