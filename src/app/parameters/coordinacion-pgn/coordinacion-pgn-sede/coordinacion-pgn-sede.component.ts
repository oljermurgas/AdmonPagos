import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { SedeEntidadService } from 'src/app/services/tipos/sede-empresa.service';
import { CoordinadorPgnService } from 'src/app/services/tipos/coordinador-pgn.services';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-coordinacion-pgn-sede',
  templateUrl: './coordinacion-pgn-sede.component.html',
  styleUrls: ['./coordinacion-pgn-sede.component.scss']
})

export class CoordinacionPgnSedeComponent implements OnDestroy {
  private ngUnsubscribe = new BehaviorSubject<void>(undefined);

  idRegistro: number =0;
  idRegistrostring: string ='0';


  items: any =[];
  textoFiltro: string ='';
  itemsIniciales: any =[];
  formulario: FormGroup;
  formularioasociado: FormGroup;
  tiposSeleccionados: string = '';
  itemsSedes: any =[];
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
    
      this.coordinadorPgnService.obtenerDatosRegistroObservable$()
        .pipe(
          filter(data => data?.id > 0)
        )
        .subscribe(data => {
          this.obtenerListaEmpresasXId(data.id);
          this.idRegistro = data.id;
        });
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
          CoordinacionPGNId: this.idRegistro,
          SedeId: tarjeta.id
        };
    
        this.sharedService.post('CoordinadorsSede', dataToSend)
          .subscribe(
            response => {
              this.toastr.success("Registros exitoso", "Exito");
              this.obtenerListaEmpresasXId(tarjeta.id);
            },
            error => {
              console.error("Error al adicionar el registro: ", error);
              // Puedes mostrar un mensaje de error al usuario utilizando Toastr u otra librería
              this.toastr.error("Hubo un error al adicionar el registro.", "Error");
            }
          );
      }
    }
    
    eliminarRegistro(tarjeta: any){
      console.log("Eliminar registro : ", tarjeta); 
      if (confirm('Esta seguro que desea eliminar el registro ?')) {
            this.sharedService.del('CoordinadorsSede', tarjeta.id).subscribe(data => {
            this.toastr.success('Mensaje','Registro Borrado');
            this.obtenerListaEmpresasXId(tarjeta.id); 
          },);
        }
    }

    async obtenerListaEmpresasXId(id: string) {
      try {
        const result = await this.coordinadorPgnService.obtenerListadoRegistrosxCoodinadorId('/CoordinadorsSede/list/' + id).toPromise();
        this.itemsSedes = result;
      } catch (error) {
        // console.error("Error al obtener detalles del coordinador: ", error);
      }
    }
    
    
    ngOnDestroy() {
      this.suscription.unsubscribe();
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
