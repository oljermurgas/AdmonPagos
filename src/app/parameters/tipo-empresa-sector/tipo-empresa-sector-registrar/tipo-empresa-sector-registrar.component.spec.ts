import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpresaSectorRegistrarComponent } from './tipo-empresa-sector-registrar.component';

describe('TipoEmpresaSectorRegistrarComponent', () => {
  let component: TipoEmpresaSectorRegistrarComponent;
  let fixture: ComponentFixture<TipoEmpresaSectorRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpresaSectorRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpresaSectorRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
