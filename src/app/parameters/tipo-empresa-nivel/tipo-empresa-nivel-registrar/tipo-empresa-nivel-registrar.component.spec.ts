import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpresaNivelRegistrarComponent } from './tipo-empresa-nivel-registrar.component';

describe('TipoEmpresaNivelRegistrarComponent', () => {
  let component: TipoEmpresaNivelRegistrarComponent;
  let fixture: ComponentFixture<TipoEmpresaNivelRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpresaNivelRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpresaNivelRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
