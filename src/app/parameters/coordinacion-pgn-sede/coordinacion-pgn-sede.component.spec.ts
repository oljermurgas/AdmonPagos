import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionPgnSedeComponent } from './coordinacion-pgn-sede.component';

describe('CoordinacionPgnSedeComponent', () => {
  let component: CoordinacionPgnSedeComponent;
  let fixture: ComponentFixture<CoordinacionPgnSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinacionPgnSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinacionPgnSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
