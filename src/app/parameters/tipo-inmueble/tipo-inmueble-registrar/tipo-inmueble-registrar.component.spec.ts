import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInmuebleRegistrarComponent } from './tipo-inmueble-registrar.component';

describe('TipoInmuebleRegistrarComponent', () => {
  let component: TipoInmuebleRegistrarComponent;
  let fixture: ComponentFixture<TipoInmuebleRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoInmuebleRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInmuebleRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
