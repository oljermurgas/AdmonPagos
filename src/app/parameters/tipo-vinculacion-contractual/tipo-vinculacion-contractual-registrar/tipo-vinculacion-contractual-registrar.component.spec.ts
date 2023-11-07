import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVinculacionContractualRegistrarComponent } from './tipo-vinculacion-contractual-registrar.component';

describe('TipoVinculacionContractualRegistrarComponent', () => {
  let component: TipoVinculacionContractualRegistrarComponent;
  let fixture: ComponentFixture<TipoVinculacionContractualRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVinculacionContractualRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVinculacionContractualRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
