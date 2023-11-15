import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/shared/services/popup-service';
import { SharedService } from '../services/shared/services/shared.service';
import { FormulariosService } from '../services/formularios.service';
import { ArchivoService } from '../services/archivo/archivo.service';

@Component({
  selector: 'app-factura-registrar',
  templateUrl: './factura-registrar.component.html',
  styleUrls: ['./factura-registrar.component.scss'],
})
export class FacturaRegistrarComponent implements OnInit {
  registerInvoiceForm!: FormGroup;
  suscription: Subscription = new Subscription();
  originalFormValues: any;
  idRegistro: number = 0;
  endPoint = 'Factura';

  tipoSede: any[] = [];
  entidades: any[] = [];

  tipoEmpresa: any[] = [];
  tipoEmpresaNivel: any[] = [];
  tipoEmpresaSector: any[] = [];




  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private formulariosService: FormulariosService,
    private archivoService: ArchivoService,
    private popupService: PopupService
  ) {
    this.registerInvoiceForm = this.formBuilder.group({
      id: new FormControl(this.idRegistro, [
      ]),
      sedeId: new FormControl('1', []),
      entidadId: new FormControl('1', []),
      facturaNumero: new FormControl('', [Validators.required]),
      referenciaPago: new FormControl('', [Validators.required]),
      numeroContrato: new FormControl('', [Validators.required]),
      fechaEmision: new FormControl(new Date(), []),
      fechaPago: new FormControl(new Date(), []),
      //Este dato no se require en el modelo de back
      fechaSuspension: new FormControl(new Date(), []),
      valorFactura: new FormControl('', [Validators.required]),
      nota: new FormControl('', []),
      urlFactura: new FormControl('', [Validators.required]),
      archivoOrigen: new FormControl('', [Validators.required]),
      valorFacturaUltimoPago: new FormControl(2131231, []),
      facturaEstadoId: new FormControl(1, []),
      fechaUltimoPago: new FormControl(new Date(), []),
      usuarioId: new FormControl('1', []),
      fechaCreacion: new FormControl(new Date(), []),
      fechaModificacion: new FormControl(new Date(), []),
    });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  onSede(event: any) {
    const departamentoId = event.target.value;
    if (departamentoId) {
      this.sharedService
        .get('departamento/' + departamentoId)
        .subscribe((data) => {
          // this.tipoMunicipio = data;
        });
    } else {
      // this.tipoMunicipio = [];
    }
  }

  onEntidad(event: any) { }

  //------------------------------------------------------------------------------------------

  guardarRegistro() {

    console.log(this.registerInvoiceForm.value);


    // Estas fechas se tienen que adicionar en el create no hacen parte del formulario
    /*     
        fechaProximaFecha: new FormControl('', []), */

    if (this.idRegistro === 0 || this.idRegistro === undefined) {
      this.AdicionarRegistro();
    } else {
      this.ActualizarRegistro();
    }
  }

  AdicionarRegistro() {

    const formData = new FormData();
    formData.append('files', this.registerInvoiceForm.get('archivoOrigen')!.value);

    this.archivoService.subirArchivo(formData);

    const dataToSend = {
      fechaProximaFecha: new Date(),
      ...this.registerInvoiceForm.value
    };

    delete dataToSend.fechaSuspension;
    delete dataToSend.archivoOrigen;

    this.sharedService.post(this.endPoint, dataToSend).subscribe(
      {
        next: (response) => {
          this.toastr.success('Registros exitoso', 'Exito');
        },
        error: (error) => {
          console.log('error : ', error);
        },
        complete: () => {

        }
      }
    )
  }

  ActualizarRegistro() {
    const jsonPatch: any[] = [];
    this.formulariosService.compareAndGeneratePatch(
      jsonPatch,
      this.registerInvoiceForm.value,
      this.originalFormValues
    );

    this.sharedService
      .patch(this.endPoint, this.idRegistro, jsonPatch)
      .subscribe(
        {
          next: (response) => {
            // this.admonPagosAdminService.obtenerListadoRegistros('/' + this.endPoint);
            this.toastr.success('Registros actualizados', 'Exito');
          },
          error: (error) => {
            const errorMessage =
              error?.message ?? 'Mensaje de error predeterminado';
            this.toastr.error(errorMessage, 'Error!');
          },
          complete: () => {

          }
        }
      );
  }

  cambioCampoArchivo(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerInvoiceForm.patchValue({
        archivoOrigen: file
      });
    }
  }

  LimpiarFormulario() {
    this.registerInvoiceForm.reset();
    this.idRegistro = 0;
  }

  openPopup() {
    if (this.idRegistro > 0) {
      this.popupService.open(this.idRegistro.toString(), 'Mensaje del Popup');
    }
  }
}
