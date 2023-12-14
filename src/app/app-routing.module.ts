import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SecurityComponent } from './security/security.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ReportsComponent } from './reports/reports.component';
import { RolesComponent } from './security/roles/roles.component';
import { UsersComponent } from './security/users/users.component';
import { TipoEmpresaComponent } from './parameters/tipo-empresa/tipo-empresa.component';
import { TipoEmpresaNivelComponent } from './parameters/tipo-empresa-nivel/tipo-empresa-nivel.component';
import { TipoInmuebleComponent } from './parameters/tipo-inmueble/tipo-inmueble.component';
import { TipoCanalEnvioFacturacionComponent } from './parameters/tipo-canal-envio-facturacion/tipo-canal-envio-facturacion.component';
import { TipoEmpresaSectorComponent } from './parameters/tipo-empresa-sector/tipo-empresa-sector.component';
import { TipoPagoAdmonComponent } from './parameters/tipo-pago-admon/tipo-pago-admon.component';
import { TipoConceptoFacturacionComponent } from './parameters/tipo-concepto-facturacion/tipo-concepto-facturacion.component';
import { SedeComponent } from './parameters/sede/sede.component';
import { EntidadComponent } from './parameters/entidad/entidad.component';
import { SedePoppupComponent } from './parameters/sede/sede-poppup/sede-poppup.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FacturaListadoComponent } from './factura-listado/factura-listado.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { TipoObligacionEmpresaComponent } from './parameters/tipo-obligacion-empresas/tipo-obligacion-empresas.component';
import { TipoTarifaComponent } from './parameters/tipo-tarifas/tipo-tarifa.component';
import { CoordinacionPgnComponent } from './parameters/coordinacion-pgn/coordinacion-pgn.component';
import { TipoVinculacionContractualComponent } from './parameters/tipo-vinculacion-contractual/tipo-vinculacion-contractual.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'security', children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      { path: 'roles', component: RolesComponent },
      { path: 'users', component: UsersComponent }
    ]},
    { path: 'parameters', children: [
      { path: 'tipo-pago-admon', component: TipoPagoAdmonComponent },
      { path: '', redirectTo: 'tipo-empresa', pathMatch: 'full' },
      { path: 'tipo-empresa', component: TipoEmpresaComponent },
      { path: 'tipo-empresa-nivel', component: TipoEmpresaNivelComponent },
      { path: 'tipo-concepto-facturacion', component: TipoConceptoFacturacionComponent },
      { path: 'entidad', component: EntidadComponent },
      { path: 'tipo-empresa-sector', component: TipoEmpresaSectorComponent },      
      { path: 'tipo-canal-envio-facturacion', component: TipoCanalEnvioFacturacionComponent },
      { path: 'tipo-inmueble', component: TipoInmuebleComponent },
      { path: 'tipo-obligacion', component: TipoObligacionEmpresaComponent },
      { path: 'tipo-tarifa', component: TipoTarifaComponent },
      { path: 'tipo-vinculacion-contractual', component: TipoVinculacionContractualComponent },
      { path: 'sede', component: SedeComponent },
      { path: 'sedepoppupComponent', component: SedePoppupComponent },
      { path: 'factura-listado', component: FacturaListadoComponent },
      { path: 'coordinador', component: CoordinacionPgnComponent }
    ]},
    { path: 'reports', component: ReportsComponent }
  ]},
  { path: 'menu-usuario', component: MenuUsuarioComponent, children: [

  ]}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



