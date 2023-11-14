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
import { EntidadService } from '../services/shared/entidades/entidad.services';

@Component({
  selector: 'app-factura-registrar',
  templateUrl: './factura-registrar.component.html',
  styleUrls: ['./factura-registrar.component.scss'],
})
export class FacturaRegistrarComponent implements OnInit {
  form: FormGroup;
  suscription: Subscription = new Subscription();
  originalFormValues: any;
  idRegistro: number = 0;
  endPoint = 'Entidad';

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
    private entidadService: EntidadService,
    private popupService: PopupService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      identificacion: [null, Validators.required],
      departamentoId: [null, Validators.required],
      municipioId: [null, Validators.required],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      tipoempresaid: [null, Validators.required],
      tipoempresanivelid: [null, Validators.required],
      tipoempresasectorid: [null, Validators.required],
      estado: [null],
      usuarioId: 1,
      fecharegistro: [null],
      fechamodificacion: [null],
    });
  }

  ngOnInit(): void {}

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

  onEntidad(event: any) {}

  //------------------------------------------------------------------------------------------

  GuardarRegistro() {
    if (this.idRegistro === 0 || this.idRegistro === undefined) {
      this.AdicionarRegistro();
    } else {
      this.ActualizarRegistro();
    }
  }

  AdicionarRegistro() {
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
      };
      console.log('dataToSend : ', dataToSend);
      this.sharedService.post(this.endPoint, dataToSend).subscribe(
        {
          next: (response) => {
            this.toastr.success('Registros exitoso', 'Exito');
          },
          error: (error) => {
            console.log('error : ', error);
          },
        }

        // (response) => {
        //   this.toastr.success('Registros exitoso', 'Exito');
        // },
        // (error) => {
        //   console.log('error : ', error);
        // }
      )
    }
  }

  ActualizarRegistro() {
    const jsonPatch: any[] = [];
    this.formulariosService.compareAndGeneratePatch(
      jsonPatch,
      this.form.value,
      this.originalFormValues
    );

    this.sharedService
      .patch(this.endPoint, this.idRegistro, jsonPatch)
      .subscribe(
        (response) => {
          // this.admonPagosAdminService.obtenerListadoRegistros('/' + this.endPoint);
          this.toastr.success('Registros actualizados', 'Exito');
        },
        (error) => {
          const errorMessage =
            error?.message ?? 'Mensaje de error predeterminado';
          this.toastr.error(errorMessage, 'Error!');
        }
      );
  }

  LimpiarFormulario() {
    this.form.reset();
    this.idRegistro = 0;
  }

  openPopup() {
    if (this.idRegistro > 0) {
      this.popupService.open(this.idRegistro.toString(), 'Mensaje del Popup');
    }
  }
}
