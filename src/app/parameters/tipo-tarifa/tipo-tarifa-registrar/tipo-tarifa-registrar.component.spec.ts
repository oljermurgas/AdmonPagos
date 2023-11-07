import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarifaRegistrarComponent } from './tipo-tarifa-registrar.component';

describe('TipoTarifaRegistrarComponent', () => {
  let component: TipoTarifaRegistrarComponent;
  let fixture: ComponentFixture<TipoTarifaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTarifaRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTarifaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
