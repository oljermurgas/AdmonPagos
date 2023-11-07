import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpresaRegistrarComponent } from './tipo-empresa-registrar.component';

describe('TipoEmpresaRegistrarComponent', () => {
  let component: TipoEmpresaRegistrarComponent;
  let fixture: ComponentFixture<TipoEmpresaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpresaRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpresaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
