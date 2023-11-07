import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCanalEnvioFacturacionRegistrarComponent } from './tipo-canal-envio-facturacion-registrar.component';

describe('TipoCanalEnvioFacturacionRegistrarComponent', () => {
  let component: TipoCanalEnvioFacturacionRegistrarComponent;
  let fixture: ComponentFixture<TipoCanalEnvioFacturacionRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCanalEnvioFacturacionRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCanalEnvioFacturacionRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
