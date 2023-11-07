import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionPgnRegistrarComponent } from './coordinacion-pgn-registrar.component';

describe('CoordinacionPgnRegistrarComponent', () => {
  let component: CoordinacionPgnRegistrarComponent;
  let fixture: ComponentFixture<CoordinacionPgnRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinacionPgnRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinacionPgnRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
