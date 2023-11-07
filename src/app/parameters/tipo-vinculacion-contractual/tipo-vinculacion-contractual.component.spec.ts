import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVinculacionContractualComponent } from './tipo-vinculacion-contractual.component';

describe('TipoVinculacionContractualComponent', () => {
  let component: TipoVinculacionContractualComponent;
  let fixture: ComponentFixture<TipoVinculacionContractualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVinculacionContractualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVinculacionContractualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
