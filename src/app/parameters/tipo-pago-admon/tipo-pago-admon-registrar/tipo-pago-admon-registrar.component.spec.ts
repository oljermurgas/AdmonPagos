import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagoAdmonRegistrarComponent } from './tipo-pago-admon-registrar.component';

describe('TipoPagoAdmonRegistrarComponent', () => {
  let component: TipoPagoAdmonRegistrarComponent;
  let fixture: ComponentFixture<TipoPagoAdmonRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPagoAdmonRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPagoAdmonRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
