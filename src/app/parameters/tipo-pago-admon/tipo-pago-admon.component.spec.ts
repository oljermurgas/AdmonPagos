import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagoAdmonComponent } from './tipo-pago-admon.component';

describe('TipoPagoAdmonComponent', () => {
  let component: TipoPagoAdmonComponent;
  let fixture: ComponentFixture<TipoPagoAdmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPagoAdmonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPagoAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
