import { Component, OnInit , Input} from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { SedeEntidadService } from 'src/app/services/tipos/sede-empresa.service';
import { CoordinadorPgnService } from 'src/app/services/tipos/coordinador-pgn.services';

@Component({
  selector: 'app-coordinacion-pgn-sede',
  templateUrl: './coordinacion-pgn-sede.component.html',
  styleUrls: ['./coordinacion-pgn-sede.component.scss']
})

export class CoordinacionPgnSedeComponent implements OnInit {
  idRegistro: number =0;
  idRegistrostring: string ='0';

  items: any =[];
  textoFiltro: string ='';
  itemsIniciales: any =[];
  formulario: FormGroup;
  formularioasociado: FormGroup;
  tiposSeleccionados: string = '';
  itemsEntidades: any =[];
  suscription: Subscription = new Subscription;

  constructor(private popupService: PopupService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private sedeService: SedeService,
              private sedeEntidadService: SedeEntidadService,
              private coordinadorPgnService: CoordinadorPgnService,
              private sharedService: SharedService) 
        {

        this.formulario = this.formBuilder.group({
          tipopagpadministracionid: [this.tiposSeleccionados],
        });

        this.formularioasociado = this.formBuilder.group({
          // tipopagpadministracionid: [this.tiposSeleccionados],
        });
       
    }

      ngOnInit() {
              this.sedeService.obtenerListadoRegistros('/Sede');
              this.sedeService.listadoData$.subscribe((data: any[]) => {
                this.items = data;
                this.itemsIniciales = this.items;
              });


              this.suscription= this.coordinadorPgnService.obtenerDatosRegistroObservable$().subscribe(data => {
                if (data && Object.keys(data).length > 0) {
                  console.log("data: ", data);
                  this.idRegistro = data.id;
                  this.obtenerListaEmpresasXId();

                } else {
                  // this.toastr.success("Los datos del servicio no son válidos o están vacíos.","Mensaje");
                }
                 this.idRegistro = data.id;
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
      
      console.log("Tarjeta: ", tarjeta);
        if (this.idRegistrostring.length > 0) {
          const dataToSend = {
              SedeId:this.idRegistrostring,
            };
        //   this.sharedService.post('SedeEntidad', dataToSend).subscribe(response => {
        //   this.toastr.success("Registros exitoso","Exito");
        //   this.obtenerListaEmpresasXId();
        // });
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
      // + this.idRegistrostring
        // this.coordinadorPgnService.obtenerListadoRegistros('/Coordinadors/list/1' );
        //   this.coordinadorPgnService.listadoItems$.subscribe((data) => {
        //   this.itemsEntidades = data;
        //   console.log("daas:::::");
        // });
    }

    ngOnDestroy() {
      // this.subscription.unsubscribe();
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
