import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCanalEnvioFacturacionComponent } from './tipo-canal-envio-facturacion.component';

describe('TipoCanalEnvioFacturacionComponent', () => {
  let component: TipoCanalEnvioFacturacionComponent;
  let fixture: ComponentFixture<TipoCanalEnvioFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCanalEnvioFacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCanalEnvioFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
