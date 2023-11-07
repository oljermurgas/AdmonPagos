import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionPgnSedeRegistrarComponent } from './coordinacion-pgn-sede-registrar.component';

describe('CoordinacionPgnSedeRegistrarComponent', () => {
  let component: CoordinacionPgnSedeRegistrarComponent;
  let fixture: ComponentFixture<CoordinacionPgnSedeRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinacionPgnSedeRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinacionPgnSedeRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
