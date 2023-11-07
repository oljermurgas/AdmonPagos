import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeEntidadComponent } from './sede-entidad.component';

describe('SedeEntidadComponent', () => {
  let component: SedeEntidadComponent;
  let fixture: ComponentFixture<SedeEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
