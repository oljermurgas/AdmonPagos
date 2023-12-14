import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'; //
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, CurrencyPipe  } from '@angular/common';

import { PopupService } from './services/shared/services/popup-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SecurityComponent } from './security/security.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ReportsComponent } from './reports/reports.component';
import { RolesComponent } from './security/roles/roles.component';
import { UsersComponent } from './security/users/users.component';
import { TipoEmpresaComponent } from './parameters/tipo-empresa/tipo-empresa.component';
import { TipoEmpresaNivelComponent } from './parameters/tipo-empresa-nivel/tipo-empresa-nivel.component';
import { ListadoTipoEmpresaComponent } from './parameters/tipo-empresa/listado-tipo-empresa/listado-tipo-empresa.component';
import { TipoEmpresaRegistrarComponent } from './parameters/tipo-empresa/tipo-empresa-registrar/tipo-empresa-registrar.component';
import { BannerBuscadorComponent } from './parameters/banner-buscador/banner-buscador.component';
import { ListadoTipoEmpresaNivelComponent } from './parameters/tipo-empresa-nivel/listado-tipo-empresa-nivel/listado-tipo-empresa-nivel.component';
import { TipoEmpresaNivelRegistrarComponent } from './parameters/tipo-empresa-nivel/tipo-empresa-nivel-registrar/tipo-empresa-nivel-registrar.component';
import { CompListarComponent } from './parameters/compartir/comp-listar/comp-listar.component';
import { CoordinacionPgnComponent } from './parameters/coordinacion-pgn/coordinacion-pgn.component';
import { EntidadComponent } from './parameters/entidad/entidad.component';
import { EntidadRegistrarComponent } from './parameters/entidad/entidad-registrar/entidad-registrar.component';
import { EntidadTipoObligacionComponent } from './parameters/entidad/entidad-tipo-obligacion/entidad-tipo-obligacion.component';
import { SedeComponent } from './parameters/sede/sede.component';
import { SedeContratoComponent } from './parameters/sede/sede-contrato/sede-contrato.component';
import { SedeRegistrarComponent } from './parameters/sede/sede-registrar/sede-registrar.component';
import { TipoCanalEnvioFacturacionComponent } from './parameters/tipo-canal-envio-facturacion/tipo-canal-envio-facturacion.component';
import { TipoCanalEnvioFacturacionRegistrarComponent } from './parameters/tipo-canal-envio-facturacion/tipo-canal-envio-facturacion-registrar/tipo-canal-envio-facturacion-registrar.component';
import { TipoConceptoFacturacionComponent } from './parameters/tipo-concepto-facturacion/tipo-concepto-facturacion.component';
import { TipoConceptoFacturacionRegistrarComponent } from './parameters/tipo-concepto-facturacion/tipo-concepto-facturacion-registrar/tipo-concepto-facturacion-registrar.component';
import { TipoEmpresaSectorComponent } from './parameters/tipo-empresa-sector/tipo-empresa-sector.component';
import { TipoEmpresaSectorRegistrarComponent } from './parameters/tipo-empresa-sector/tipo-empresa-sector-registrar/tipo-empresa-sector-registrar.component';
import { TipoInmuebleComponent } from './parameters/tipo-inmueble/tipo-inmueble.component';
import { TipoInmuebleRegistrarComponent } from './parameters/tipo-inmueble/tipo-inmueble-registrar/tipo-inmueble-registrar.component';
import { TipoPagoAdmonComponent } from './parameters/tipo-pago-admon/tipo-pago-admon.component';
import { TipoPagoAdmonRegistrarComponent } from './parameters/tipo-pago-admon/tipo-pago-admon-registrar/tipo-pago-admon-registrar.component';
import { TipoVinculacionContractualComponent } from './parameters/tipo-vinculacion-contractual/tipo-vinculacion-contractual.component';
import { TipoVinculacionContractualRegistrarComponent } from './parameters/tipo-vinculacion-contractual/tipo-vinculacion-contractual-registrar/tipo-vinculacion-contractual-registrar.component';
import { CoordinacionPgnRegistrarComponent } from './parameters/coordinacion-pgn/coordinacion-pgn-registrar/coordinacion-pgn-registrar.component';
import { SedePoppupComponent } from './parameters/sede/sede-poppup/sede-poppup.component';
import { SedesListadoComponent } from './parameters/sede/sede-listado/sede-listado.component';
import { EntidadListadoComponent } from './parameters/entidad/entidad-listado/entidad-listado.component';
import { EntidadPoppupComponent } from './parameters/entidad/entidad-poppup/entidad-poppup.component';
import { SedeService } from './services/shared/sedes/sede.services';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FacturaListadoComponent } from './factura-listado/factura-listado.component';
import { FacturaRegistrarComponent } from './factura-registrar/factura-registrar.component';
import { FacturaTarjetaComponent } from './factura-tarjeta/factura-tarjeta.component'; 
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { ListadoTipoInmuebleComponent } from './parameters/tipo-inmueble/listado-inmueble/listado-tipo-inmueble.component';
import { ListadoTipoCanalEnvioComponent } from './parameters/tipo-canal-envio-facturacion/listado-tipo-canal-envio/listado-tipo-canal-envio.component';
import { ListadoTipoEmpresaSectorComponent } from './parameters/tipo-empresa-sector/listado-tipo-empresa-sector/listado-tipo-empresa-sector.component';
import { ListadoTipoPagoAdmonComponent } from './parameters/tipo-pago-admon/listado-tipo-pago-admon/listado-tipo-pago-admon.component';
import { ListadoConceptoFacturacionComponent } from './parameters/tipo-concepto-facturacion/listado-concepto-facturacion/listado-concepto-facturacion.component';
import { TipoObligacionEmpresaComponent } from './parameters/tipo-obligacion-empresas/tipo-obligacion-empresas.component';
import { ListadoTipoObligacionEmpresasComponent } from './parameters/tipo-obligacion-empresas/listado-tipo-obligacion-empresas/listado-tipo-obligacion-empresas.component';
import { TipoObligacionEmpresaRegistrarComponent } from './parameters/tipo-obligacion-empresas/tipo-obligacion-empresas-registrar/tipo-obligacion-empresas-registrar.component';
import { ListadoTipoTarifaComponent } from './parameters/tipo-tarifas/listado-tipo-tarifa/listado-tipo-tarifa.component';
import { TipoTarifaRegistrarComponent } from './parameters/tipo-tarifas/tipo-tarifa-registrar/tipo-tarifa-registrar.component';
import { TipoTarifaComponent } from './parameters/tipo-tarifas/tipo-tarifa.component';
import { SedePoppupAsociarEmpresaComponent } from './parameters/sede/sede-poppup-asociar-empresa/sede-poppup-asociar-empresa.component';
import { CoordinacionPgnListadoComponent } from './parameters/coordinacion-pgn/coordinacion-pgn-listado/coordinacion-pgn-listado.component';
import { ListadoTipoVinculacionContractualComponent } from './parameters/tipo-vinculacion-contractual/listado-tipo-vinculacion-contractual/listado-tipo-vinculacion-contractual.component';
import { CoordinacionPgnSedeComponent } from './parameters/coordinacion-pgn/coordinacion-pgn-sede/coordinacion-pgn-sede.component';
import { FacturaPoppupRegistrarDetalleComponent } from './factura-registrar/factura-poppup-registrar-detalle/factura-poppup-registrar-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopMenuComponent,
    SecurityComponent,
    ParametersComponent,
    ReportsComponent,
    RolesComponent,
    UsersComponent,
    TipoEmpresaComponent,
    TipoEmpresaNivelComponent,
    ListadoTipoEmpresaComponent,
    TipoEmpresaRegistrarComponent,
    BannerBuscadorComponent,
    ListadoTipoEmpresaNivelComponent,
    TipoEmpresaNivelRegistrarComponent,
    CompListarComponent,
    CoordinacionPgnComponent,
    CoordinacionPgnSedeComponent,
    EntidadComponent,
    EntidadRegistrarComponent,
    EntidadTipoObligacionComponent,
    SedeComponent,
    SedeContratoComponent,
    SedeRegistrarComponent,
    TipoCanalEnvioFacturacionComponent,
    TipoCanalEnvioFacturacionRegistrarComponent,
    TipoConceptoFacturacionComponent,
    TipoConceptoFacturacionRegistrarComponent,
    TipoEmpresaSectorComponent,
    TipoEmpresaSectorRegistrarComponent,
    TipoInmuebleComponent,
    TipoInmuebleRegistrarComponent,
    TipoPagoAdmonComponent,
    TipoPagoAdmonRegistrarComponent,
    TipoVinculacionContractualComponent,
    TipoVinculacionContractualRegistrarComponent,
    CoordinacionPgnRegistrarComponent,
    SedePoppupComponent,
    SedesListadoComponent,
    EntidadListadoComponent,
    EntidadPoppupComponent,
    MenuLateralComponent,
    FacturaListadoComponent,
    FacturaRegistrarComponent,
    FacturaTarjetaComponent,
    CustomPopupComponent,
    MenuUsuarioComponent,
    ListadoTipoInmuebleComponent,
    ListadoTipoCanalEnvioComponent,
    ListadoTipoEmpresaSectorComponent,
    ListadoTipoPagoAdmonComponent,
    ListadoConceptoFacturacionComponent,
    TipoObligacionEmpresaComponent,
    ListadoTipoObligacionEmpresasComponent,
    TipoObligacionEmpresaRegistrarComponent,
    ListadoTipoTarifaComponent,
    TipoTarifaRegistrarComponent,
    TipoTarifaComponent,
    SedePoppupAsociarEmpresaComponent,
    CoordinacionPgnListadoComponent,
    ListadoTipoVinculacionContractualComponent,
    CoordinacionPgnSedeComponent,
    FacturaPoppupRegistrarDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    // CompListarComponent,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Ubicación en la parte superior derecha
      closeButton: true, // Agrega un botón de cerrar en las notificaciones
      timeOut: 5000, // Duración en milisegundos antes de ocultar automáticamente
      extendedTimeOut: 1000, // Tiempo extra después de pasar el cursor sobre la notificación
    })
  ],
  providers: [
              { provide: PopupService}, 
              {provide: CurrencyPipe},
              SedeService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
