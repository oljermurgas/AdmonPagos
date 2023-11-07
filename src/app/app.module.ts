import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'; //
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
import { CoordinacionPgnSedeComponent } from './parameters/coordinacion-pgn-sede/coordinacion-pgn-sede.component';
import { CoordinacionPgnSedeRegistrarComponent } from './parameters/coordinacion-pgn-sede/coordinacion-pgn-sede-registrar/coordinacion-pgn-sede-registrar.component';
import { EntidadComponent } from './parameters/entidad/entidad.component';
import { EntidadRegistrarComponent } from './parameters/entidad/entidad-registrar/entidad-registrar.component';
import { EntidadTipoObligacionComponent } from './parameters/entidad/entidad-tipo-obligacion/entidad-tipo-obligacion.component';
import { SedeComponent } from './parameters/sede/sede.component';
import { SedeContratoComponent } from './parameters/sede/sede-contrato/sede-contrato.component';
import { SedeEntidadComponent } from './parameters/sede-entidad/sede-entidad.component';
import { SedeEntidadRegistrarComponent } from './parameters/sede-entidad/sede-entidad-registrar/sede-entidad-registrar.component';
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
import { TipoTarifaComponent } from './parameters/tipo-tarifa/tipo-tarifa.component';
import { TipoTarifaRegistrarComponent } from './parameters/tipo-tarifa/tipo-tarifa-registrar/tipo-tarifa-registrar.component';
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
import { FacturaRegistroPagoComponent } from './factura-registro-pago/factura-registro-pago.component';
import { FacturaRegistrarComponent } from './factura-registrar/factura-registrar.component';
import { FacturaTarjetaComponent } from './factura-tarjeta/factura-tarjeta.component'; 
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';


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
    CoordinacionPgnSedeRegistrarComponent,
    EntidadComponent,
    EntidadRegistrarComponent,
    EntidadTipoObligacionComponent,
    SedeComponent,
    SedeContratoComponent,
    SedeEntidadComponent,
    SedeEntidadRegistrarComponent,
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
    TipoTarifaComponent,
    TipoTarifaRegistrarComponent,
    TipoVinculacionContractualComponent,
    TipoVinculacionContractualRegistrarComponent,
    CoordinacionPgnRegistrarComponent,
    SedePoppupComponent,
    SedesListadoComponent,
    EntidadListadoComponent,
    EntidadPoppupComponent,
    MenuLateralComponent,
    FacturaListadoComponent,
    FacturaRegistroPagoComponent,
    FacturaRegistrarComponent,
    FacturaTarjetaComponent,
    CustomPopupComponent,
    MenuUsuarioComponent
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
    SedeService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
