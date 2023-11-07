import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeEntidadRegistrarComponent } from './sede-entidad-registrar.component';

describe('SedeEntidadRegistrarComponent', () => {
  let component: SedeEntidadRegistrarComponent;
  let fixture: ComponentFixture<SedeEntidadRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeEntidadRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeEntidadRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
