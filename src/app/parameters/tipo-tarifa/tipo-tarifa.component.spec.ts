import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarifaComponent } from './tipo-tarifa.component';

describe('TipoTarifaComponent', () => {
  let component: TipoTarifaComponent;
  let fixture: ComponentFixture<TipoTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
