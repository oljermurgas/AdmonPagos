import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaRegistroPagoComponent } from './factura-registro-pago.component';

describe('FacturaRegistroPagoComponent', () => {
  let component: FacturaRegistroPagoComponent;
  let fixture: ComponentFixture<FacturaRegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaRegistroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaRegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
